import express from 'express';
import { readDb, writeDb } from '../db.js';
import { authenticate } from './auth.js';

const router = express.Router();

export const courseModules = [
  {
    id: 'mod_1',
    number: 1,
    title: {
      en: 'Web Foundations & Setup',
      hi: 'वेब डेवलपमेंट की शुरुआत और सेटअप',
      hinglish: 'Web Foundations & Dev Setup'
    },
    desc: {
      en: 'Learn how the internet works, install VS Code, and setup your developer workstation.',
      hi: 'इंटरनेट कैसे काम करता है, VS Code इनस्टॉल करें और अपना वर्कस्टेशन बनाएं।',
      hinglish: 'Internet kaise kaam karta hai, VS Code install karo aur developer environment ready karo.'
    },
    lessons: [
      {
        id: 'sigma_01',
        title: {
          en: 'Tutorial #1: Installing VS Code & How Websites Work',
          hi: 'ट्यूटोरियल #1: VS Code इनस्टॉल करना और वेबसाइट कैसे काम करती हैं',
          hinglish: 'Tutorial #1: VS Code Install Karna & Websites Kaise Kaam Karti Hain'
        },
        videoId: 'tVzUXW6siu0',
        duration: '29 min',
        xpReward: 50,
        summary: {
          en: 'Understand client-server architecture, browsers, DNS, and setup VS Code with Live Server.',
          hi: 'क्लाइंट-सर्वर आर्किटेक्चर, ब्राउज़र, DNS और लाइव सर्वर के साथ VS Code सेटअप समझें।',
          hinglish: 'Client-Server architecture, browsers, DNS aur VS Code live server ke sath setup karna seekho.'
        },
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Sigma Website</title>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #38bdf8; text-align: center; padding-top: 50px; }
    h1 { font-size: 2.5rem; }
    p { color: #94a3b8; font-size: 1.2rem; }
    button { background: #38bdf8; color: #0f172a; border: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Hello World! 🚀</h1>
  <p>I am starting my Web Dev Journey with Sigma Course!</p>
  <button onclick="alert('Welcome to Sigma Web Dev!')">Click Me Bro</button>
</body>
</html>`,
        quiz: {
          question: {
            en: 'What protocol does a browser use to request a webpage from a server?',
            hi: 'सर्वर से वेबपेज मंगाने के लिए ब्राउज़र किस प्रोटोकॉल का उपयोग करता है?',
            hinglish: 'Browser server se webpage request karne ke liye kaunsa protocol use karta hai?'
          },
          options: ['HTTP / HTTPS', 'FTP', 'SMTP', 'SSH'],
          correct: 0,
          explanation: 'HTTP (Hypertext Transfer Protocol) and secure HTTPS are used to transfer web pages over the internet.'
        }
      },
      {
        id: 'sigma_02',
        title: {
          en: 'Tutorial #2: Your First HTML Website',
          hi: 'ट्यूटोरियल #2: आपकी पहली HTML वेबसाइट',
          hinglish: 'Tutorial #2: Aapki Pehli HTML Website'
        },
        videoId: 'kJEsTjH5mVg',
        duration: '18 min',
        xpReward: 50,
        summary: {
          en: 'Basic structure of HTML: DOCTYPE, head, body, and basic tags.',
          hi: 'HTML की मूल संरचना: DOCTYPE, head, body और मूल टैग।',
          hinglish: 'HTML ka basic structure: DOCTYPE, head, body aur common tags.'
        },
        starterCode: `<h1>Welcome to Coding</h1>\n<p>HTML is the skeleton of every website.</p>`,
        quiz: {
          question: {
            en: 'Which tag is the root container of an HTML document?',
            hi: 'HTML दस्तावेज़ का रूट कंटेनर कौन सा टैग है?',
            hinglish: 'HTML document ka root container kaunsa tag hota hai?'
          },
          options: ['<head>', '<body>', '<html>', '<document>'],
          correct: 2,
          explanation: 'The <html> tag wraps all other HTML tags on a page.'
        }
      }
    ]
  },
  {
    id: 'mod_2',
    number: 2,
    title: {
      en: 'HTML5 Semantic & Forms',
      hi: 'HTML5 सिमेंटिक टैग और फॉर्म्स',
      hinglish: 'HTML5 Semantic Tags & Forms Mastery'
    },
    desc: {
      en: 'Build modern user forms, embed audio/video, and master semantic tags for SEO.',
      hi: 'आधुनिक यूजर फॉर्म बनाएं, ऑडियो/वीडियो एम्बेड करें और SEO के लिए सिमेंटिक टैग सीखें।',
      hinglish: 'Modern user forms banao, video/audio embed karo aur SEO-friendly semantic tags samjho.'
    },
    lessons: [
      {
        id: 'sigma_03',
        title: {
          en: 'HTML Forms & Inputs',
          hi: 'HTML फॉर्म्स और इनपुट्स',
          hinglish: 'HTML Forms, Inputs & Action Buttons'
        },
        videoId: '7Pv93m7q6ms',
        duration: '24 min',
        xpReward: 60,
        summary: {
          en: 'Text, email, password, radio buttons, checkboxes, and form validation.',
          hi: 'टेक्स्ट, ईमेल, पासवर्ड, रेडियो बटन, चेकबॉक्स और फॉर्म सत्यापन।',
          hinglish: 'Form inputs: text, password, submit buttons aur validation attributes seekho.'
        },
        starterCode: `<form style="display: flex; flex-direction: column; gap: 10px; max-width: 300px; margin: 20px auto; background: #1e293b; padding: 20px; border-radius: 12px; color: white;">
  <label>Your Name:</label>
  <input type="text" placeholder="Gamer Tag" style="padding: 8px; border-radius: 6px; border: 1px solid #475569;" />
  <label>Your Email:</label>
  <input type="email" placeholder="genz@code.dev" style="padding: 8px; border-radius: 6px; border: 1px solid #475569;" />
  <button type="submit" style="background: #a855f7; color: white; padding: 10px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Join the Squad 🚀</button>
</form>`,
        quiz: {
          question: {
            en: 'Which HTML attribute marks an input field as mandatory before submission?',
            hi: 'सबमिट करने से पहले कौन सा HTML एट्रिब्यूट किसी इनपुट को अनिवार्य बनाता है?',
            hinglish: 'Submit karne se pehle kis attribute se input compulsory banta hai?'
          },
          options: ['validate', 'required', 'mandatory', 'checked'],
          correct: 1,
          explanation: 'The `required` attribute prevents form submission if empty.'
        }
      }
    ]
  },
  {
    id: 'mod_3',
    number: 3,
    title: {
      en: 'CSS3, Flexbox & Responsive Design',
      hi: 'CSS3, फ्लेक्सबॉक्स और रिस्पॉन्सिव डिज़ाइन',
      hinglish: 'CSS3 Styling, Flexbox & Responsive Layouts'
    },
    desc: {
      en: 'Style websites like a pro. Understand Box Model, Flexbox layout, and CSS Grid.',
      hi: 'वेबसाइट्स को प्रो की तरह स्टाइल करें। बॉक्स मॉडल, फ्लेक्सबॉक्स और ग्रिड सीखें।',
      hinglish: 'Box model, Flexbox centering trick, Grid aur responsive media queries master karo.'
    },
    lessons: [
      {
        id: 'sigma_04',
        title: {
          en: 'The Ultimate CSS Flexbox Guide',
          hi: 'अल्टीमेट CSS फ्लेक्सबॉक्स गाइड',
          hinglish: 'CSS Flexbox Guide: Centering & Alignment'
        },
        videoId: 'ESnrn1kAD4E',
        duration: '35 min',
        xpReward: 75,
        summary: {
          en: 'Master justify-content, align-items, flex-direction, and flex-wrap.',
          hi: 'justify-content, align-items, flex-direction और flex-wrap में महारत हासिल करें।',
          hinglish: 'Flexbox properties: justify-content, align-items, flex-direction aur centering master karo.'
        },
        starterCode: `<div style="display: flex; justify-content: center; align-items: center; height: 180px; background: linear-gradient(135deg, #6366f1, #a855f7); border-radius: 12px;">
  <div style="background: white; color: #1e1b4b; padding: 16px 24px; border-radius: 8px; font-weight: bold; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
    ⚡ Centered in 2 lines with Flexbox!
  </div>
</div>`,
        quiz: {
          question: {
            en: 'Which property centers flex items along the cross axis (vertical in row)?',
            hi: 'कौन सी प्रॉपर्टी फ्लेक्स आइटम्स को क्रॉस एक्सिस पर केंद्र में लाती है?',
            hinglish: 'Flex items ko cross-axis (vertical) me center karne ke liye kaunsi property use hoti hai?'
          },
          options: ['justify-content', 'align-items', 'text-align', 'float'],
          correct: 1,
          explanation: '`align-items: center` centers items along the perpendicular (cross) axis.'
        }
      }
    ]
  },
  {
    id: 'mod_4',
    number: 4,
    title: {
      en: 'JavaScript Fundamentals to Async',
      hi: 'जावास्क्रिप्ट फंडामेंटल्स से एसिंक्रोनस तक',
      hinglish: 'JavaScript: Logic, DOM & Async/Await'
    },
    desc: {
      en: 'Make web pages interactive with JavaScript, DOM events, and Async Fetch API.',
      hi: 'जावास्क्रिप्ट, DOM इवेंट्स और Async Fetch API से वेबपेज को इंटरैक्टिव बनाएं।',
      hinglish: 'DOM manipulation, click events, Promises, async/await aur API calls seekho.'
    },
    lessons: [
      {
        id: 'sigma_05',
        title: {
          en: 'DOM Manipulation & Event Listeners',
          hi: 'DOM मैनिपुलेशन और इवेंट लिसनर्स',
          hinglish: 'DOM Manipulation: querySelector & addEventListener'
        },
        videoId: 'onb2cbgvdqw',
        duration: '32 min',
        xpReward: 80,
        summary: {
          en: 'Select elements, change styles dynamically, and react to user clicks and inputs.',
          hi: 'एलिमेंट्स चुनें, स्टाइल बदलें और यूजर के क्लिक पर रिस्पॉन्ड करें।',
          hinglish: 'querySelector se element pakdo aur addEventListener se button clicks handle karo.'
        },
        starterCode: `<div style="text-align: center; padding: 20px; font-family: sans-serif; background: #090d16; color: white; border-radius: 12px;">
  <h2 id="counter-val" style="font-size: 3rem; color: #38bdf8; margin: 10px 0;">0</h2>
  <div style="display: flex; gap: 10px; justify-content: center;">
    <button id="btn-inc" style="background: #22c55e; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Increment 🚀</button>
    <button id="btn-reset" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer;">Reset 🔄</button>
  </div>
</div>
<script>
  let count = 0;
  const countDisplay = document.getElementById('counter-val');
  document.getElementById('btn-inc').addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
  });
  document.getElementById('btn-reset').addEventListener('click', () => {
    count = 0;
    countDisplay.textContent = count;
  });
</script>`,
        quiz: {
          question: {
            en: 'Which method adds a click handler to an HTML element in JavaScript?',
            hi: 'जावास्क्रिप्ट में किसी HTML एलिमेंट में क्लिक हैंडलर जोड़ने के लिए किस विधि का उपयोग किया जाता है?',
            hinglish: 'JavaScript me element par click event lagane ke liye kaunsa method use hota hai?'
          },
          options: ['element.onClick()', 'element.addEventListener("click", fn)', 'element.attach()', 'element.listenClick()'],
          correct: 1,
          explanation: '`addEventListener("click", callback)` is the standard modern approach.'
        }
      }
    ]
  },
  {
    id: 'mod_5',
    number: 5,
    title: {
      en: 'Backend with Node.js, Express & MongoDB',
      hi: 'Node.js, Express और MongoDB के साथ बैकएंड',
      hinglish: 'Full-Stack Backend: Node, Express & MongoDB'
    },
    desc: {
      en: 'Build powerful REST APIs, connect databases, and create real-world fullstack apps.',
      hi: 'REST API बनाएं, डेटाबेस कनेक्ट करें और रियल-वर्ल्ड फुलस्टैक ऐप्स बनाएं।',
      hinglish: 'Server setup karo, routes banao, MongoDB connect karo aur complete web app deploy karo.'
    },
    lessons: [
      {
        id: 'sigma_06',
        title: {
          en: 'Building Your First Express.js Server',
          hi: 'अपना पहला Express.js सर्वर बनाना',
          hinglish: 'First Express.js Server & REST API Endpoints'
        },
        videoId: 'fBvUPbZlKk4',
        duration: '28 min',
        xpReward: 90,
        summary: {
          en: 'Setup an Express app, configure routes (GET, POST), and understand middleware.',
          hi: 'Express ऐप सेटअप करें, रूट्स (GET, POST) कॉन्फ़िगर करें और मिडलवेयर समझें।',
          hinglish: 'Express app banao, GET aur POST request handle karo aur JSON response bhejo.'
        },
        starterCode: `// Sample Express.js Server Code
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/greeting', (req, res) => {
  res.json({ message: "Welcome to Sigma Fullstack Backend! 🚀" });
});

app.listen(3000, () => console.log('Server vibing on port 3000'));`,
        quiz: {
          question: {
            en: 'Which HTTP method is typically used to create a new resource on a REST API?',
            hi: 'REST API पर एक नया संसाधन बनाने के लिए आमतौर पर किस HTTP विधि का उपयोग किया जाता है?',
            hinglish: 'REST API me naya data create karne ke liye kaunsa HTTP method use hota hai?'
          },
          options: ['GET', 'POST', 'PUT', 'DELETE'],
          correct: 1,
          explanation: 'POST is standard for creating new resources on a server.'
        }
      }
    ]
  }
];

// Get all modules & lessons
router.get('/modules', (req, res) => {
  res.json(courseModules);
});

// Mark lesson completed & award XP
router.post('/complete-lesson', authenticate, (req, res) => {
  try {
    const { lessonId, quizScore } = req.body;
    if (!lessonId) {
      return res.status(400).json({ error: 'lessonId is required' });
    }

    const db = readDb();
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already completed
    const existing = db.progress.find(p => p.userId === req.user.id && p.lessonId === lessonId);
    let xpGained = 0;

    if (!existing) {
      // Find XP reward
      let reward = 50;
      for (const m of courseModules) {
        const found = m.lessons.find(l => l.id === lessonId);
        if (found) {
          reward = found.xpReward || 50;
          break;
        }
      }

      xpGained = reward + (quizScore ? quizScore * 10 : 0);
      user.xp = (user.xp || 0) + xpGained;
      user.level = Math.floor(user.xp / 150) + 1;

      // Badges
      if (user.xp >= 150 && !user.badges.includes('CSS Alchemist 🎨')) {
        user.badges.push('CSS Alchemist 🎨');
      }
      if (user.xp >= 300 && !user.badges.includes('JS Sorcerer ⚡')) {
        user.badges.push('JS Sorcerer ⚡');
      }
      if (user.xp >= 500 && !user.badges.includes('Sigma Fullstack God 👑')) {
        user.badges.push('Sigma Fullstack God 👑');
      }

      db.progress.push({
        userId: req.user.id,
        lessonId,
        completedAt: new Date().toISOString(),
        quizScore: quizScore || 0
      });

      writeDb(db);
    }

    const allCompleted = db.progress.filter(p => p.userId === req.user.id).map(p => p.lessonId);

    res.json({
      success: true,
      alreadyCompleted: !!existing,
      xpGained,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        streak: user.streak,
        level: user.level,
        badges: user.badges
      },
      completedLessons: allCompleted
    });
  } catch (err) {
    console.error('Complete lesson error:', err);
    res.status(500).json({ error: 'Failed to record progress' });
  }
});

export default router;

