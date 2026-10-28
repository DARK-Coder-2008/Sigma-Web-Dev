import express from 'express';
import { readDb, writeDb } from '../db.js';

const router = express.Router();

// Smart AI Knowledge base for web dev questions
const generateSmartResponse = (query, lang = 'hinglish') => {
  const q = query.toLowerCase();

  if (lang === 'hi') {
    if (q.includes('html') || q.includes('tag')) {
      return `HTML (HyperText Markup Language) वेबपेज का कंकाल (skeleton) है! 
जैसे:
\`\`\`html
<h1>नमस्ते दुनिया!</h1>
<p>यह मेरा पहला वेबपेज है।</p>
<a href="https://google.com">Google पर जाएं</a>
\`\`\`
टिप: हमेशा semantic tags जैसे \`<header>\`, \`<main>\`, \`<footer>\` इस्तेमाल करें ताकि आपकी वेबसाइट SEO-friendly बने! 🚀`;
    }
    if (q.includes('css') || q.includes('style') || q.includes('color') || q.includes('center')) {
      return `CSS से हम वेबसाइट को सुंदर बनाते हैं! 🎨
किसी भी div को center करने का सबसे आसान तरीका Flexbox है:
\`\`\`css
.center-box {
  display: flex;
  justify-content: center; /* क्षैतिज केंद्र */
  align-items: center;     /* लंबवत केंद्र */
  height: 100vh;
}
\`\`\`
इस जादुई 3 लाइनों से कभी भी अलाइनमेंट में समस्या नहीं आएगी! ⚡`;
    }
    if (q.includes('javascript') || q.includes('js') || q.includes('variable') || q.includes('function')) {
      return `JavaScript वेबपेज का दिमाग (brain) है! 🧠
यह आपकी साइट को इंटरैक्टिव बनाता है:
\`\`\`javascript
const greetUser = (name) => {
  return \`हेलो \${name}, सिग्मा वेब डेवलपर बनने की यात्रा में स्वागत है!\`;
};
console.log(greetUser("दोस्त"));
\`\`\`
इवेंट लिसनर्स की मदद से आप बटन क्लिक और फॉर्म सबमिशन को हैंडल कर सकते हैं!`;
    }
    if (q.includes('api') || q.includes('fetch') || q.includes('backend') || q.includes('node') || q.includes('express')) {
      return `बैकएंड और APIs सर्वर से डेटा लाने-ले जाने का काम करते हैं! 🌐
Express.js में API बनाना बहुत सरल है:
\`\`\`javascript
app.get('/api/users', (req, res) => {
  res.json({ message: "सफलतापूर्वक डेटा प्राप्त हुआ!" });
});
\`\`\`
फ्रंटएंड पर आप \`fetch()\` या \`axios\` का उपयोग करके इसे कॉल कर सकते हैं! 🔥`;
    }
    return `वाह! बहुत अच्छा सवाल है। वेब डेवलपमेंट में कंसिस्टेंसी सबसे महत्वपूर्ण है। कोड को छोटे-छोटे टुकड़ों में बांटें और रोज़ 30 मिनट प्रैक्टिस करें। आप किस खास टॉपिक (HTML, CSS, JS, React, Node) के बारे में समझना चाहते हैं? 💻`;
  }

  if (lang === 'hinglish') {
    if (q.includes('center') || q.includes('css') || q.includes('flexbox') || q.includes('grid')) {
      return `Arre bro, div center karna CSS ka sabse iconic meme hai, but super easy! 😎
Flexbox trick use karo, no cap:
\`\`\`css
.parent {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center;     /* Vertical center */
  min-height: 100vh;
}
\`\`\`
Bas yeh 3 lines and boom! Aapka content dead center ho jayega. Fire, right? 🔥`;
    }
    if (q.includes('html') || q.includes('boiler') || q.includes('tag')) {
      return `HTML basically website ka skeleton hai bro! 🦴
VS Code me bas \`!\` likh ke tab press karo, instant boilerplate mil jayega:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sigma Project</title>
</head>
<body>
  <h1>Yo Gen-Z Dev! 🚀</h1>
</body>
</html>
\`\`\`
Pro tip: \`<div>\` soup mat banao, semantic tags like \`<nav>\`, \`<section>\`, \`<article>\` use karo for W SEO! 📈`;
    }
    if (q.includes('js') || q.includes('javascript') || q.includes('dom') || q.includes('event')) {
      return `JavaScript is literally the sauce that makes websites alive! ⚡
DOM se kisi bhi button ko clickable banana ho toh:
\`\`\`javascript
const btn = document.querySelector('#hype-btn');
btn.addEventListener('click', () => {
  console.log('Button clicked, full vibe check passed! 🔥');
});
\`\`\`
Var ko bhool jao bro, hamesha \`const\` ya \`let\` use karo modern ES6 standard me. Clean code = pure Sigma energy! 👑`;
    }
    if (q.includes('backend') || q.includes('node') || q.includes('express') || q.includes('api')) {
      return `Backend matlab server ka secret hideout! 🕵️‍♂️
Express.js se REST API banana bohot chill hai:
\`\`\`javascript
import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/vibe', (req, res) => {
  res.json({ status: "All good fam!", xp: 100 });
});

app.listen(5000, () => console.log('Server cooking on port 5000 🍳'));
\`\`\`
Database ke sath connect karke data save karo and you are full-stack ready! 💪`;
    }
    if (q.includes('react') || q.includes('component') || q.includes('state') || q.includes('hook')) {
      return `React is peak frontend productivity bro! ⚛️
Components lego blocks jaise hote hain:
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)}>
      🔥 Likes: {likes}
    </button>
  );
}
\`\`\`
State change hote hi React UI ko automatically re-render karta hai bina page refresh ke! Absolute magic! ✨`;
    }
    return `Bro, solid question! Web dev journey me bugs aana normal hai, ussi se toh dev level up hota hai! 🎮
Aap mujhe exact code snippet bhej sakte ho ya batao kis concept me doubt hai (HTML, CSS Flexbox/Grid, JS DOM, ya Backend)? Let's cook! 🚀`;
  }

  // English fallback
  if (q.includes('css') || q.includes('center') || q.includes('flex')) {
    return `Centering in CSS is super sleek with modern Flexbox! 🎨
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`
This handles both horizontal and vertical centering cleanly across all mobile and desktop viewports. ⚡`;
  }
  if (q.includes('javascript') || q.includes('async') || q.includes('promise')) {
    return `Asynchronous JavaScript lets you fetch server data without freezing the UI! 🚀
\`\`\`javascript
async function loadUserData() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    console.log('User data loaded:', data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
\`\`\`
Always pair \`async/await\` with a \`try/catch\` block for clean error handling. 🛡️`;
  }

  return `That's a fantastic question! In web development, consistent hands-on building is key. Feel free to paste your code here or ask about HTML5, CSS layout, JavaScript DOM, or Express APIs and I'll break it down for you! 💻✨`;
};

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, language = 'hinglish', context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = generateSmartResponse(message, language);

    // Save chat history if db available
    try {
      const db = readDb();
      db.chatHistory.push({
        id: 'msg_' + Date.now(),
        message,
        reply,
        language,
        timestamp: new Date().toISOString()
      });
      // Keep only last 100
      if (db.chatHistory.length > 100) {
        db.chatHistory = db.chatHistory.slice(-100);
      }
      writeDb(db);
    } catch (e) {
      // Non-blocking
    }

    res.json({
      reply,
      sender: 'SigmaBot 🤖',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Chatbot encountered an error' });
  }
});

export default router;

