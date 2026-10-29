import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, WifiOff, Sparkles, ExternalLink, Package, Clock, AlertCircle } from 'lucide-react';

export default function DownloadApkModal({ isOpen, onClose, deferredPrompt, language }) {
  if (!isOpen) return null;

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
    } else {
      alert(language === 'hi'
        ? "अपने Android Chrome ब्राउज़र में '3 डॉट्स (⋮)' पर टैप करें और 'Install app' या 'Add to Home screen' चुनें!"
        : language === 'hinglish'
        ? "Apne phone ke Chrome browser me top-right '3 dots (⋮)' par tap karein aur 'Install app' ya 'Add to Home screen' select karein!"
        : "Tap the 3 dots (⋮) in your mobile browser and select 'Install app' or 'Add to Home screen'!");
    }
  };

  const pwaBuilderUrl = "https://www.pwabuilder.com/reportcard?site=https://dark-coder-2008.github.io/Sigma-Web-Dev/";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel border border-violet-500/30 rounded-2xl p-6 shadow-2xl relative glow-purple animate-in fade-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 mb-3 shadow-lg shadow-violet-500/30">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-lg font-display font-black text-white">
            {language === 'hi' ? 'Android APK और मोबाइल ऐप' : language === 'hinglish' ? 'Android APK & Mobile App 📱' : 'Download Android App (APK)'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            DARK CODER • SIGMA WEB DEV
          </p>
        </div>

        {/* Pipeline Status Notice */}
        <div className="mb-4 p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 space-y-1">
          <div className="flex items-center space-x-1.5 text-violet-300 font-bold text-xs">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            <span>Standalone .APK Build: In Pipeline</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Direct WebAPK phone install is ready now! Standalone release APK is currently in build stage.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="space-y-1.5 mb-4">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
            <WifiOff className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>100% Offline Mode (All 139 Chapters)</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero Play Store Fees ($0 Free Install)</span>
          </div>
        </div>

        {/* Method 1: Instant WebAPK Install (1-Tap to Phone Home Screen) */}
        <div className="mb-3.5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-bold text-white font-mono">Method 1: Instant Phone Install</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30">Recommended</span>
          </div>
          <button
            onClick={handleInstallPwa}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/30 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hinglish' ? 'Install to Phone App Drawer 📲' : 'Install Instant WebAPK'}</span>
          </button>
        </div>

        {/* Method 2: PWABuilder Cloud APK Package */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-slate-300 mb-1 block font-mono">Method 2: Standalone .APK Package</span>
          <a
            href={pwaBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-violet-500/40 text-violet-300 hover:text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md text-center"
          >
            <Package className="w-4 h-4 text-violet-400" />
            <span>Generate .APK via PWABuilder</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Step-by-Step Chrome Guide */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1 leading-relaxed">
          <strong className="text-violet-400 block mb-0.5">
            {language === 'hinglish' ? 'Chrome se 1-Click install karein:' : 'How to install on Android Chrome:'}
          </strong>
          <p>1. Open <strong>dark-coder-2008.github.io/Sigma-Web-Dev/</strong></p>
          <p>2. Tap <strong>3 dots (⋮)</strong> in Chrome.</p>
          <p>3. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
          <p>4. <strong>SigmaDev</strong> will install directly into your phone drawer!</p>
        </div>

      </div>
    </div>
  );
}
