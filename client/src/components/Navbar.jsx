import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Zap, 
  User, 
  LogIn, 
  Smartphone, 
  Sun, 
  Moon, 
  Home, 
  BookOpen, 
  Code2, 
  FolderGit2, 
  Trophy, 
  Bot, 
  ShieldCheck 
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Navbar({ 
  user, 
  language, 
  setLanguage, 
  onOpenAuth, 
  onOpenProfile,
  onOpenApkModal,
  activeTab,
  setActiveTab,
  isOffline
}) {
  const t = translations[language] || translations.hinglish;
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('sigma_theme') !== 'light';
  });

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('sigma_theme', nextMode ? 'dark' : 'light');
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'roadmap', label: '139 Chapters', icon: BookOpen },
    { id: 'playground', label: 'Code Lab', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'chatbot', label: 'SigmaBot', icon: Bot },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B16]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
            Σ
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 text-sm sm:text-base leading-tight">
                SIGMA WEB DEV
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Offline Ready" />
            </div>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider">
              DARK CODER • 139 CHAPTERS
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Controls */}
        <div className="flex items-center space-x-2">
          
          {/* APK / PWA Install Button */}
          <button
            onClick={onOpenApkModal}
            className="hidden sm:flex items-center space-x-1 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
            title="Download APK / Install PWA"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Coder Theme'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
          </button>

          {/* Streak Counter */}
          <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
            <span>{user ? user.streak : 1}</span>
          </div>

          {/* XP Counter */}
          <div className="flex items-center space-x-1 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-full text-cyan-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>{user ? user.xp : 485}</span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl px-2.5 py-1.5 border border-slate-800 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none pr-5"
            >
              <option value="hinglish">Hinglish</option>
              <option value="hi">हिंदी</option>
              <option value="en">English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-slate-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Auth / Profile Button */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold border border-violet-400/40 shadow-md"
              title={user.name}
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md shadow-violet-600/30 transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
}