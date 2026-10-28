import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, Copy, Check } from 'lucide-react';
import { translations } from '../i18n/translations';

// In-Browser Smart AI Engine (Works 100% offline & on GitHub Pages)
const generateSmartLocalResponse = (query, lang = 'hinglish') => {
  const q = query.toLowerCase();

  if (lang === 'hi') {
    if (q.includes('html') || q.includes('tag') || q.includes('element')) {
      return `HTML (HyperText Markup Language) वेबपेज का मूल कंकाल (skeleton) है! 🦴
मुख्य टैग्स का उदाहरण:
\`\`\`html
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>मेरा पहला वेबपेज</title>
</head>
<body>
  <h1>नमस्ते सिग्मा कोडर! 🚀</h1>
  <p>HTML से हम संरचना (structure) बनाते हैं।</p>
  <button onclick="alert('क्लिक हुआ!')">मुझे दबाएं</button>
</body>
</html>
\`\`\`
सिग्मा टिप: हमेशा semantic tags जैसे \`<header>\`, \`<main>\`, \`<article>\`, \`<footer>\` इस्तेमाल करें ताकि आपकी साइट SEO-friendly बने! 📈`;
    }

    if (q.includes('css') || q.includes('center') || q.includes('flex') || q.includes('style') || q.includes('color')) {
      return `CSS से हम वेबपेज को डिज़ाइन और सुंदर बनाते हैं! 🎨
किसी भी element को स्क्रीन के बीच (center) में लाने का सबसे आसान तरीका Flexbox है:
\`\`\`css
.parent-container {
  display: flex;
  justify-content: center; /* क्षैतिज केंद्र (Horizontal) */
  align-items: center;     /* लंबवत केंद्र (Vertical) */
  min-height: 100vh;
}
\`\`\`
इस जादुई 3 लाइनों से कोई भी div हमेशा केंद्र में रहेगा! ⚡`;
    }

    if (q.includes('js') || q.includes('javascript') || q.includes('dom') || q.includes('event') || q.includes('button')) {
      return `JavaScript वेबपेज का दिमाग (brain) है जो इसे इंटरैक्टिव बनाता है! 🧠
बटन क्लिक पर काम करवाने का तरीका (DOM Event Listener):
\`\`\`javascript
const myButton = document.querySelector('#action-btn');

myButton.addEventListener('click', () => {
  console.log('बटन क्लिक हुआ, डाटा प्रोसेस हो रहा है! 🚀');
  document.body.style.backgroundColor = '#0f172a';
});
\`\`\`
सिग्मा नियम: आधुनिक ES6 में \`var\` के बजाय हमेशा \`const\` या \`let\` का उपयोग करें! ✨`;
    }

    if (q.includes('react') || q.includes('component') || q.includes('state') || q.includes('hook')) {
      return `React एक लोकप्रिय JavaScript लाइब्रेरी है जिससे तेज़ी से UI बनाए जाते हैं! ⚛️
स्टेट मैनेजमेंट का बेसिक उदाहरण:
\`\`\`jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      क्लिक संख्या: {count} 🔥
    </button>
  );
}
\`\`\`
स्टेट बदलते ही React बिना पूरा पेज रीलोड किए सिर्फ ज़रूरी हिस्सा अपडेट करता है!`;
    }

    if (q.includes('backend') || q.includes('node') || q.includes('express') || q.includes('mongo') || q.includes('api')) {
      return `बैकएंड सर्वर लॉजिक और डेटाबेस से डेटा हैंडल करने के लिए होता है! 🌐
Express.js में REST API बनाना:
\`\`\`javascript
import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/greeting', (req, res) => {
  res.json({ message: "सिग्मा बैकएंड से नमस्ते!", success: true });
});

app.listen(5000, () => console.log('सर्वर 5000 पोर्ट पर चालू है 🚀'));
\`\`\`
डेटा हमेशा JSON फॉर्मेट में सुरक्षित रूप से ट्रांसफर होता है! 🛡️`;
    }

    return `वाह! बहुत अच्छा सवाल है। वेब डेवलपमेंट में कंसिस्टेंसी सबसे महत्वपूर्ण है। कोड को छोटे टुकड़ों में बांटें और रोज़ 30 मिनट प्रैक्टिस करें। आप HTML, CSS, JavaScript, React या Backend में से किस टॉपिक का डाउट पूछना चाहते हैं? 💻✨`;
  }

  if (lang === 'hinglish') {
    if (q.includes('center') || q.includes('flex') || q.includes('css') || q.includes('grid')) {
      return `Arre bro, div center karna CSS ka sabse iconic meme hai, but super easy! 😎
Modern Flexbox trick use karo, no cap:
\`\`\`css
.hero-box {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center;     /* Vertical center */
  min-height: 100vh;
}
\`\`\`
Bas yeh 3 lines and boom! Aapka box dead-center ho jayega viewport ke. Certified flex! 🔥`;
    }

    if (q.includes('html') || q.includes('tag') || q.includes('boiler') || q.includes('skeleton')) {
      return `HTML website ka skeleton (kankal) hai bro! 🦴
VS Code me bas \`!\` type karke Tab dabao, instant boilerplate ready:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sigma Project</title>
</head>
<body>
  <h1>Yo Gen-Z Dev! 🚀</h1>
  <p>Structure set, ab CSS se styling karenge!</p>
</body>
</html>
\`\`\`
Pro Tip: \`<div>\` soup mat banao, semantic tags like \`<nav>\`, \`<main>\`, \`<section>\` use karo W SEO ke liye! 📈`;
    }

    if (q.includes('js') || q.includes('javascript') || q.includes('dom') || q.includes('event')) {
      return `JavaScript is literally the brain that gives life to your webpage! ⚡
Button click handle karne ka standard syntax:
\`\`\`javascript
const btn = document.querySelector('#hype-btn');

btn.addEventListener('click', () => {
  console.log('Button clicked, full vibe check passed! 🔥');
});
\`\`\`
Var ko bhool jao bro, modern code me hamesha \`const\` ya \`let\` use karo. Clean code = pure Sigma energy! 👑`;
    }

    if (q.includes('react') || q.includes('component') || q.includes('hook') || q.includes('state')) {
      return `React is peak frontend productivity bro! ⚛️
Components lego blocks jaise re-use hote hain:
\`\`\`jsx
import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);
  return (
    <button onClick={() => setLikes(likes + 1)}>
      🔥 Fire Likes: {likes}
    </button>
  );
}
\`\`\`
Jab bhi \`setLikes\` call hota hai, React automatically virtual DOM se UI sync kar leta hai bina page reload ke! Absolute W! ✨`;
    }

    if (q.includes('node') || q.includes('express') || q.includes('backend') || q.includes('mongo') || q.includes('api')) {
      return `Backend matlab server ka secret power house! 🕵️‍♂️
Express.js me REST API banana bohot chill hai:
\`\`\`javascript
import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/vibe', (req, res) => {
  res.json({ status: "All good fam!", xp: 100 });
});

app.listen(5000, () => console.log('Server cooking on port 5000 🍳'));
\`\`\`
Database (MongoDB) se connect karke user data save karo and you are full-stack ready! 💪`;
    }

    return `Bro, solid question! Web dev journey me bugs aana normal hai, ussi se toh dev level up hota hai! 🎮
Aap mujhe exact code snippet bhej sakte ho ya batao kis concept me doubt hai (HTML, CSS Flexbox/Grid, JS DOM, React, ya Backend)? Let's cook! 🚀`;
  }

  // English
  if (q.includes('center') || q.includes('flex') || q.includes('css')) {
    return `Centering any element in CSS is effortless with modern Flexbox! 🎨
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Horizontal alignment */
  align-items: center;     /* Vertical alignment */
  min-height: 100vh;
}
\`\`\`
This handles both desktop and mobile viewports seamlessly. ⚡`;
  }

  if (q.includes('javascript') || q.includes('promise') || q.includes('async')) {
    return `Asynchronous JavaScript allows you to fetch server data without freezing your UI! 🚀
\`\`\`javascript
async function loadData() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
\`\`\`
Always wrap \`await\` in a \`try...catch\` block for clean error recovery. 🛡️`;
  }

  return `Great question! In web development, consistent hands-on building is key. You can paste your code right here or ask about HTML5, CSS layout, JavaScript DOM, React hooks, or Express APIs! 💻✨`;
};

export default function AiChatbot({ language }) {
  const t = translations[language];
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: t.botIntro,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    let reply = '';

    // 1. Try server endpoint first (if backend is active)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s quick timeout

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          language
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.reply) reply = data.reply;
      }
    } catch (e) {
      // Backend not running (e.g. on GitHub Pages or Offline Mode)
    }

    // 2. If no server reply, generate instantly from in-browser AI engine
    if (!reply) {
      await new Promise(r => setTimeout(r, 400)); // natural typing delay
      reply = generateSmartLocalResponse(textToSend.trim(), language);
    }

    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper to render message with markdown code blocks
  const renderMessageContent = (content, msgId) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(1).join('\n') || lines[0];

        return (
          <div key={index} className="my-2 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 text-left">
            <div className="bg-slate-900 px-3 py-1 flex justify-between items-center text-[10px] text-purple-400 font-mono">
              <span>{lang || 'code'}</span>
              <button
                onClick={() => copyCode(code, `${msgId}-${index}`)}
                className="text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedIndex === `${msgId}-${index}` ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedIndex === `${msgId}-${index}` ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-2.5 text-[11px] font-mono text-cyan-200 overflow-x-auto whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto flex flex-col h-[calc(100vh-130px)]">
      {/* Bot Top Header */}
      <div className="flex items-center justify-between p-3 rounded-2xl glass-panel border border-slate-800 mb-3 shadow-md">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          <div>
            <h3 className="text-xs font-display font-bold text-white flex items-center space-x-1">
              <span>SigmaBot AI Tutor</span>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">Offline Ready • Hinglish & Hindi</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full">
          ⚡ 100% Online & Offline
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                : 'bg-slate-800 text-cyan-400 border border-slate-700'
            }`}>
              {msg.sender === 'user' ? <UserIcon className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white shadow-md rounded-tr-none'
                : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
            }`}>
              {renderMessageContent(msg.text, msg.id)}
              <span className="block text-[9px] text-slate-400 text-right mt-1 font-mono">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
            <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="font-mono text-[11px] animate-pulse">SigmaBot is cooking an answer...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Pills */}
      <div className="py-2 overflow-x-auto flex space-x-1.5 no-scrollbar">
        {t.quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 text-[10px] bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-full whitespace-nowrap transition-all"
          >
            ⚡ {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative flex items-center mt-1"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.askBot}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-3.5 pr-11 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-1.5 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all shadow-md shadow-purple-600/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
