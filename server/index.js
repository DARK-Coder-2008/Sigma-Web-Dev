import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/course.js';
import chatbotRoutes from './routes/chatbot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/chat', chatbotRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Sigma Web Dev Android API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Sigma Web Dev API Server running on port ${PORT}`);
});

