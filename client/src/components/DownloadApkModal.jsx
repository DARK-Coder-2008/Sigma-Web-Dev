import React from 'react';
import { X, Smartphone, Download, CheckCircle2, ShieldCheck, WifiOff, Sparkles, ExternalLink, Package } from 'lucide-react';

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

  const pwaBuilderUrl = "https://www.pwabuilder.com/reportcard?site=https://dark-coder-2008.github.io/Sigma-Web-Dev/";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative glow-cyan animate-in fade-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto">
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
            {language === 'hi' ? 'Android APK / ऐप लॉन्च करें' : language === 'hinglish' ? 'Android APK & App Launcher 📱' : 'Download Android App (APK)'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'hinglish' ? '100% Free me apne phone me install karein' : 'Install free as native Android App'}
          </p>
        </div>

        {/* Features Pill */}
        <div className="space-y-2 mb-4">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <WifiOff className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>100% Offline Mode (All 139 Chapters)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Official WebAPK Native Integration</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-xs text-slate-200">
            <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span>Zero Google Play Store Fees ($0 Free)</span>
          </div>
        </div>

        {/* Option 1: Direct 1-Tap Phone Install */}
        <div className="mb-3">
          <p className="text-[11px] font-bold text-slate-300 mb-1.5 font-mono">Option 1: Direct Phone Install (WebAPK)</p>
          <button
            onClick={handleInstallApp}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/30 hover:opacity-95 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hinglish' ? 'Install to Phone App Drawer 📲' : 'Install Direct WebAPK'}</span>
          </button>
        </div>

        {/* Option 2: PWABuilder Standalone APK Download */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-slate-300 mb-1.5 font-mono">Option 2: Standalone .APK File (PWABuilder)</p>
          <a
            href={pwaBuilderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md text-center"
          >
            <Package className="w-4 h-4 text-purple-400" />
            <span>Generate & Download .APK Package</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
          </a>
        </div>

        {/* Step-by-Step Manual Guide */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
          <strong className="text-cyan-400 block mb-1">
            {language === 'hinglish' ? 'Phone me install karne ka aasan tareeqa:' : 'How to install on Android:'}
          </strong>
          <p>1. Apne Android phone me Chrome browser kholein.</p>
          <p>2. Link open karein: <strong>dark-coder-2008.github.io/Sigma-Web-Dev/</strong></p>
          <p>3. Top-right me <strong>3 dots (⋮)</strong> dabayein.</p>
          <p>4. <strong>"Install app"</strong> / <strong>"Add to Home screen"</strong> select karein.</p>
          <p>5. Phone me <strong>SigmaDev</strong> app icon aa jayega aur full-screen chalega!</p>
        </div>
      </div>
    </div>
  );
}
