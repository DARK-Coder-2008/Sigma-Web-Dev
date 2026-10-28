import React from 'react';
import { Flame, Zap, Globe, User, LogIn, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Navbar({ 
  user, 
  language, 
  setLanguage, 
  onOpenAuth, 
  onOpenProfile,
  onOpenApkModal,
  isOffline
}) {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 px-3 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-base shadow-lg shadow-purple-500/30">
            Σ
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-sm leading-tight">
                {t.appTitle}
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Offline Ready" />
            </div>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider">139 CHAPTERS • OFFLINE</p>
          </div>
        </div>

        {/* Right Stats & Controls */}
        <div className="flex items-center space-x-1.5">
          {/* APK Download Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center space-x-1 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-lg text-xs font-bold transition-all active:scale-95"
            title="Download APK / Install App"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">APK</span>
          </button>

          {/* Streak */}
          <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-full text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
            <span>{user ? user.streak : 1}</span>
          </div>

          {/* XP */}
          <div className="flex items-center space-x-1 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-full text-cyan-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>{user ? user.xp : 50}</span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-2 py-1 border border-slate-700 focus:outline-none focus:border-purple-500 cursor-pointer appearance-none pr-4.5"
            >
              <option value="hinglish">Hinglish</option>
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-0.5 text-slate-400">
              <span className="text-[9px]">▼</span>
            </div>
          </div>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold border border-purple-300/40 shadow-sm"
              title={user.name}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md shadow-purple-600/30 transition-all active:scale-95"
            >
              <LogIn className="w-3 h-3" />
              <span className="hidden sm:inline">{t.login}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
