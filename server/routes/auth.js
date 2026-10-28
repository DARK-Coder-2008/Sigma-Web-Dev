import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb, writeDb } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'sigma-genz-secret-key-2026';

// Middleware to verify JWT token
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expired or invalid' });
  }
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const db = readDb();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      xp: 50, // Welcome XP
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      level: 1,
      badges: ['Sigma Rookie 🚀'],
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDb(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Welcome to Sigma Web Dev!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        xp: newUser.xp,
        streak: newUser.streak,
        level: newUser.level,
        badges: newUser.badges
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const db = readDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Update streak if needed
    const today = new Date().toISOString().split('T')[0];
    const lastActive = user.lastActiveDate;
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActive === yesterday) {
        user.streak = (user.streak || 0) + 1;
      } else {
        user.streak = 1;
      }
      user.lastActiveDate = today;
      writeDb(db);
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        xp: user.xp || 50,
        streak: user.streak || 1,
        level: user.level || 1,
        badges: user.badges || ['Sigma Rookie 🚀']
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Me (User profile & progress)
router.get('/me', authenticate, (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userProgress = db.progress.filter(p => p.userId === req.user.id);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      streak: user.streak,
      level: user.level,
      badges: user.badges
    },
    completedLessons: userProgress.map(p => p.lessonId)
  });
});

export default router;

