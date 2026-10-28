import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';
import { translations } from '../i18n/translations';

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, sans-serif;
      background: #090d16;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    .card {
      background: #1e293b;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #334155;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    h1 {
      color: #38bdf8;
      margin-top: 0;
    }
    button {
      background: #a855f7;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s;
    }
    button:active {
      transform: scale(0.95);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Sigma Code Lab 🚀</h1>
    <p>Edit HTML, CSS, and JS right here!</p>
    <button onclick="changeVibe()">Click for Vibe Check</button>
  </div>

  <script>
    function changeVibe() {
      alert('Vibe check passed! You are a certified Sigma Dev! 🔥');
    }
  </script>
</body>
</html>`;

export default function CodePlayground({ initialCode, language }) {
  const t = translations[language];
  const [code, setCode] = useState(initialCode || DEFAULT_CODE);
  const [srcDoc, setSrcDoc] = useState(initialCode || DEFAULT_CODE);
  const [copied, setCopied] = useState(false);

  // Sync if initialCode passed from lesson
  React.useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setSrcDoc(initialCode);
    }
  }, [initialCode]);

  const handleRun = () => {
    setSrcDoc(code);
  };

  const handleReset = () => {
    setCode(DEFAULT_CODE);
    setSrcDoc(DEFAULT_CODE);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto space-y-3">
      {/* Header Controls */}
      <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs font-mono font-bold text-slate-300 ml-1">Live Sandbox</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRun}
            className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md shadow-purple-600/30 hover:opacity-95 active:scale-95"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{t.runCode}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <div className="bg-slate-900 px-3 py-1 text-[11px] font-mono text-purple-400 border-b border-slate-800 flex justify-between items-center">
          <span>index.html (HTML + CSS + JS)</span>
          <span className="text-slate-500 text-[10px]">Auto-sandboxed</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          rows={9}
          className="w-full bg-slate-950 text-cyan-200 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed selection:bg-purple-600 selection:text-white"
        />
      </div>

      {/* Live Preview Pane */}
      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
        <div className="bg-slate-900 px-3 py-1.5 text-[11px] font-mono text-cyan-400 border-b border-slate-800 flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Browser Preview Output</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">● 200 OK</span>
        </div>
        <div className="h-56 bg-slate-950 w-full">
          <iframe
            srcDoc={srcDoc}
            title="Live Preview"
            sandbox="allow-scripts allow-modals"
            className="w-full h-full border-0 bg-slate-950"
          />
        </div>
      </div>
    </div>
  );
}

