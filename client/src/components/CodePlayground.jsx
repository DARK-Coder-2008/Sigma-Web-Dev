import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Save, 
  FolderOpen, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  Layers, 
  FileCode, 
  Code2, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STARTER_TEMPLATES = {
  default: {
    name: 'Modern Hero Banner',
    html: `<div class="card">
  <div class="badge">DARK CODER LAB ⚡</div>
  <h1>Interactive Sandbox</h1>
  <p>Separate HTML, CSS, and JS execution in a secured environment.</p>
  <button id="btn-action">Click to Trigger Logic</button>
  <div id="output" class="status-box">Status: Ready</div>
</div>`,
    css: `body {
  margin: 0;
  padding: 24px;
  background-color: #080B16;
  color: #F8FAFC;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  box-sizing: border-box;
}

.card {
  background: #11182A;
  border: 1px solid #2563EB40;
  border-radius: 20px;
  padding: 32px;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.15);
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #A78BFA;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

h1 {
  font-size: 26px;
  margin: 0 0 12px 0;
  color: #F8FAFC;
}

p {
  color: #94A3B8;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

button {
  background: linear-gradient(135deg, #8B5CF6, #2563EB);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
}

button:active {
  transform: scale(0.98);
}

.status-box {
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  background: #0D1222;
  border: 1px solid #1E293B;
  color: #22C55E;
  font-family: monospace;
  font-size: 13px;
}`,
    js: `document.getElementById('btn-action').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.textContent = '⚡ Script Executed at ' + new Date().toLocaleTimeString();
  output.style.borderColor = '#8B5CF6';
  output.style.color = '#A78BFA';
});`
  },
  glassmorphism: {
    name: 'Glassmorphism Card',
    html: `<div class="glass-container">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="glass-card">
    <h2>Frosted Glass UI</h2>
    <p>Using CSS backdrop-filter: blur(16px) with semi-transparent borders.</p>
    <button onclick="toggleGlow()">Toggle Pulse</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  background: #080B16;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.glass-container {
  position: relative;
  width: 320px;
  padding: 40px;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
}
.orb-1 {
  width: 150px;
  height: 150px;
  background: #8B5CF6;
  top: 0;
  left: 0;
}
.orb-2 {
  width: 150px;
  height: 150px;
  background: #2563EB;
  bottom: 0;
  right: 0;
}
.glass-card {
  position: relative;
  background: rgba(17, 24, 42, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
button {
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}`,
    js: `function toggleGlow() {
  const card = document.querySelector('.glass-card');
  card.style.boxShadow = card.style.boxShadow.includes('0 0 30px') 
    ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' 
    : '0 0 30px #8B5CF6';
}`
  },
  counter: {
    name: 'Interactive Counter App',
    html: `<div class="counter-box">
  <h2>Stateful Counter</h2>
  <div id="counter-value">0</div>
  <div class="btn-group">
    <button id="btn-dec">- Decrease</button>
    <button id="btn-reset">Reset</button>
    <button id="btn-inc">+ Increase</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  background: #080B16;
  color: #fff;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.counter-box {
  background: #11182A;
  border: 1px solid #1E293B;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}
#counter-value {
  font-size: 64px;
  font-weight: 800;
  color: #8B5CF6;
  margin: 20px 0;
  font-family: monospace;
}
.btn-group {
  display: flex;
  gap: 8px;
}
button {
  background: #1E293B;
  border: 1px solid #334155;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
button:hover {
  background: #2563EB;
}`,
    js: `let count = 0;
const valueEl = document.getElementById('counter-value');
document.getElementById('btn-inc').onclick = () => { count++; update(); };
document.getElementById('btn-dec').onclick = () => { count--; update(); };
document.getElementById('btn-reset').onclick = () => { count = 0; update(); };
function update() {
  valueEl.textContent = count;
  valueEl.style.color = count > 0 ? '#22C55E' : count < 0 ? '#EF4444' : '#8B5CF6';
}`
  }
};

export default function CodePlayground({ initialCode, language }) {
  const [activeEditorTab, setActiveEditorTab] = useState('html'); // 'html' | 'css' | 'js' | 'raw'
  const [htmlCode, setHtmlCode] = useState(STARTER_TEMPLATES.default.html);
  const [cssCode, setCssCode] = useState(STARTER_TEMPLATES.default.css);
  const [jsCode, setJsCode] = useState(STARTER_TEMPLATES.default.js);
  const [rawCode, setRawCode] = useState('');
  const [isRawMode, setIsRawMode] = useState(false);

  const [srcDoc, setSrcDoc] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [savedProjects, setSavedProjects] = useState([]);
  const [projectName, setProjectName] = useState('My Web Project');
  const [showSavedModal, setShowSavedModal] = useState(false);
  const iframeRef = useRef(null);

  // Load saved projects from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sigma_saved_projects') || '[]');
      setSavedProjects(saved);
    } catch {}
  }, []);

  // Handle passed initialCode (e.g. from chapter or project)
  useEffect(() => {
    if (initialCode) {
      if (initialCode.includes('<!DOCTYPE') || initialCode.includes('<html')) {
        setIsRawMode(true);
        setRawCode(initialCode);
        setSrcDoc(initialCode);
      } else {
        setIsRawMode(false);
        setHtmlCode(initialCode);
        updatePreview(initialCode, cssCode, jsCode);
      }
    } else {
      updatePreview(htmlCode, cssCode, jsCode);
    }
  }, [initialCode]);

  // Construct iframe document
  const updatePreview = (h, c, j) => {
    if (isRawMode) {
      setSrcDoc(rawCode);
      return;
    }
    const doc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${c}
  </style>
</head>
<body>
  ${h}
  <script>
    try {
      ${j}
    } catch (err) {
      console.error('Playground JS Error:', err);
      const errBox = document.createElement('div');
      errBox.style = 'position:fixed;bottom:10px;left:10px;right:10px;background:#EF4444;color:white;padding:10px;border-radius:8px;font-family:monospace;font-size:12px;z-index:99999;';
      errBox.textContent = 'Runtime Error: ' + err.message;
      document.body.appendChild(errBox);
    }
  </script>
</body>
</html>`;
    setSrcDoc(doc);
  };

  const handleRun = () => {
    if (isRawMode) {
      setSrcDoc(rawCode);
    } else {
      updatePreview(htmlCode, cssCode, jsCode);
    }
  };

  const handleReset = () => {
    const tpl = STARTER_TEMPLATES.default;
    setHtmlCode(tpl.html);
    setCssCode(tpl.css);
    setJsCode(tpl.js);
    setIsRawMode(false);
    updatePreview(tpl.html, tpl.css, tpl.js);
  };

  const handleClearOutput = () => {
    setSrcDoc('<!DOCTYPE html><html><body style="background:#080B16;color:#94A3B8;font-family:sans-serif;padding:20px;">Output cleared. Click "Run Code" to preview.</body></html>');
  };

  const handleCopy = () => {
    const currentText = isRawMode 
      ? rawCode 
      : activeEditorTab === 'html' ? htmlCode : activeEditorTab === 'css' ? cssCode : jsCode;
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadTemplate = (key) => {
    const tpl = STARTER_TEMPLATES[key];
    if (tpl) {
      setHtmlCode(tpl.html);
      setCssCode(tpl.css);
      setJsCode(tpl.js);
      setIsRawMode(false);
      updatePreview(tpl.html, tpl.css, tpl.js);
    }
  };

  const handleSaveProject = () => {
    const newProj = {
      id: 'proj_' + Date.now(),
      name: projectName.trim() || 'Untitled Project',
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      savedAt: new Date().toLocaleDateString()
    };
    const updated = [newProj, ...savedProjects.slice(0, 19)];
    setSavedProjects(updated);
    localStorage.setItem('sigma_saved_projects', JSON.stringify(updated));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const handleLoadSavedProject = (proj) => {
    setProjectName(proj.name);
    setHtmlCode(proj.html);
    setCssCode(proj.css);
    setJsCode(proj.js);
    setIsRawMode(false);
    updatePreview(proj.html, proj.css, proj.js);
    setShowSavedModal(false);
  };

  const handleDeleteSavedProject = (id, e) => {
    e.stopPropagation();
    const updated = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem('sigma_saved_projects', JSON.stringify(updated));
  };

  const handleDownload = () => {
    const fullHtml = srcDoc || `<!DOCTYPE html>
<html>
<head><style>${cssCode}</style></head>
<body>
${htmlCode}
<script>${jsCode}</script>
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '-') || 'sigma-code-lab'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-full pb-28 pt-3 px-3 sm:px-6 max-w-7xl mx-auto space-y-4 text-left ${
      isFullscreen ? 'fixed inset-0 z-50 bg-[#080B16] p-4 overflow-auto pb-6' : ''
    }`}>
      
      {/* Top Toolbar */}
      <div className="bg-[#11182A] border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Project title & Templates */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono text-xs font-bold">
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">DARK CODER LAB</span>
          </div>

          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs font-bold text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-violet-500 w-32 sm:w-48"
            placeholder="Project Name..."
          />

          {/* Template select */}
          <select
            onChange={(e) => handleLoadTemplate(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold px-2 py-1.5 rounded-lg focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            <option value="default">Template: Hero Banner</option>
            <option value="glassmorphism">Template: Glassmorphism</option>
            <option value="counter">Template: Counter App</option>
          </select>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Run Button */}
          <button
            onClick={handleRun}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Code</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveProject}
            title="Save Project to Browser"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold transition-all"
          >
            <Save className="w-3.5 h-3.5 text-violet-400" />
            <span className="hidden sm:inline">Save</span>
          </button>

          {/* Load Projects Modal Button */}
          <button
            onClick={() => setShowSavedModal(!showSavedModal)}
            title="Load Saved Projects"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold transition-all"
          >
            <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Projects ({savedProjects.length})</span>
          </button>

          {/* Download HTML */}
          <button
            onClick={handleDownload}
            title="Download .html file"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            title="Reset to Default"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Saved Projects Dropdown / Modal */}
      {showSavedModal && (
        <div className="bg-[#11182A] border border-violet-500/30 rounded-2xl p-4 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-mono font-bold text-violet-300 uppercase">
              Saved Browser Projects ({savedProjects.length})
            </h4>
            <button
              onClick={() => setShowSavedModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          {savedProjects.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono py-2">
              No saved projects yet. Click "Save" above to bookmark your creations locally!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {savedProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => handleLoadSavedProject(proj)}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 cursor-pointer flex items-center justify-between group transition-all"
                >
                  <div className="truncate">
                    <p className="text-xs font-bold text-white group-hover:text-violet-300 truncate">
                      {proj.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">Saved {proj.savedAt}</p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteSavedProject(proj.id, e)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 ml-2"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor & Preview Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[520px]">
        
        {/* LEFT COLUMN: EDITORS */}
        <div className="flex flex-col bg-[#11182A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Editor Tabs */}
          <div className="flex items-center justify-between bg-slate-950/80 px-3 py-2 border-b border-slate-800">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => { setIsRawMode(false); setActiveEditorTab('html'); }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  !isRawMode && activeEditorTab === 'html'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HTML5
              </button>
              <button
                onClick={() => { setIsRawMode(false); setActiveEditorTab('css'); }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  !isRawMode && activeEditorTab === 'css'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CSS3
              </button>
              <button
                onClick={() => { setIsRawMode(false); setActiveEditorTab('js'); }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  !isRawMode && activeEditorTab === 'js'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                JavaScript
              </button>
              <button
                onClick={() => setIsRawMode(true)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  isRawMode
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Combined / Full
              </button>
            </div>

            <span className="text-[10px] font-mono text-slate-500">
              {isRawMode ? 'RAW HTML' : activeEditorTab.toUpperCase()}
            </span>
          </div>

          {/* Textarea Code Input */}
          <div className="relative flex-1 p-2 bg-[#080B16]">
            {isRawMode ? (
              <textarea
                value={rawCode}
                onChange={(e) => setRawCode(e.target.value)}
                placeholder="Paste full <!DOCTYPE html> document here..."
                className="w-full h-full min-h-[460px] bg-transparent text-slate-200 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed selection:bg-violet-600"
                spellCheck="false"
              />
            ) : activeEditorTab === 'html' ? (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="Write HTML markup here (e.g. <div>, <button>, <input>)..."
                className="w-full h-full min-h-[460px] bg-transparent text-slate-200 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed selection:bg-orange-600"
                spellCheck="false"
              />
            ) : activeEditorTab === 'css' ? (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                placeholder="Write CSS styling rules here (e.g. body { background: #080B16; })..."
                className="w-full h-full min-h-[460px] bg-transparent text-slate-200 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed selection:bg-cyan-600"
                spellCheck="false"
              />
            ) : (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                placeholder="Write JavaScript logic here (e.g. document.addEventListener)..."
                className="w-full h-full min-h-[460px] bg-transparent text-slate-200 font-mono text-xs p-3 focus:outline-none resize-none leading-relaxed selection:bg-yellow-600"
                spellCheck="false"
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SANDBOXED LIVE PREVIEW */}
        <div className="flex flex-col bg-[#11182A] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Preview Header */}
          <div className="flex items-center justify-between bg-slate-950/80 px-3 py-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono font-bold text-slate-300 ml-1">Live Sandboxed Output</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleClearOutput}
                className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
              >
                Clear
              </button>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Isolated Frame</span>
              </span>
            </div>
          </div>

          {/* Sandboxed iframe (strictly isolated from sensitive cookies & storage) */}
          <div className="relative flex-1 bg-white min-h-[460px]">
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              title="Code Lab Sandboxed Output"
              sandbox="allow-scripts"
              className="w-full h-full min-h-[460px] border-none"
            />
          </div>
        </div>

      </div>

    </div>
  );
}