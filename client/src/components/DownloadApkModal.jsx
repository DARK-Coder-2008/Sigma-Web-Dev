import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, WifiOff, Sparkles, ExternalLink } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function DownloadApkModal({ isOpen, onClose, deferredPrompt, language }) {
  if (!isOpen) return null;

  const handleInstallApp = async () => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative glow-cyan animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 mb-3 shadow-lg shadow-cyan-500/30">
            <Smartphone className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-lg font-display font-black text-white">
            {language === 'hi' ? 'Android APK / ऐप इंस्टॉल करें' : language === 'hinglish' ? 'Download Android App 📱' : 'Download Android App (APK)'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hinglish' ? '100% Offline chalega bina internet ke!' : 'Works 100% offline without active internet!'}
          </p>
        </div>

        {/* Key Features Pill */}
        <div className="space-y-2 mb-5">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <WifiOff className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>100% Offline Mode (All 139 Chapters cached)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Lightweight & Zero Ads (No storage waste)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span>Full-Screen Native Android App Experience</span>
          </div>
        </div>

        {/* 1-Tap Install Action */}
        <button
          onClick={handleInstallApp}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/30 hover:opacity-95 active:scale-95 transition-all mb-4"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'hinglish' ? 'Install to Android Phone Now 🚀' : 'Install Android App Now'}</span>
        </button>

        {/* Step-by-Step Guide */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
          <strong className="text-purple-400 block mb-1">
            {language === 'hinglish' ? 'Manual Install Steps (Android Chrome):' : 'Manual Install Steps:'}
          </strong>
          <p>1. Open this website link in Chrome on your phone.</p>
          <p>2. Tap the <strong>3 dots (⋮)</strong> icon in top-right.</p>
          <p>3. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
          <p>4. The Sigma Dev icon will appear on your phone screen!</p>
        </div>
      </div>
    </div>
  );
}

