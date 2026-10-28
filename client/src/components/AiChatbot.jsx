import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles, Copy, Check } from 'lucide-react';
import { translations } from '../i18n/translations';

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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          language
        })
      });

      const data = await res.json();
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply || "Sorry bro, server glitch! Try asking again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Network issue bro! Make sure server is running.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
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
            <p className="text-[10px] text-slate-400 font-mono">Always Online • Hinglish & Hindi Ready</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">
          v2.0 Gen-Z
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

