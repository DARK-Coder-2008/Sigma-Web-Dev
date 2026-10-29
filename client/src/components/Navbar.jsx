import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Zap, 
  User, 
  LogIn, 
  LogOut,
  Sun, 
  Moon, 
  Home, 
  BookOpen, 
  Code2, 
  FolderGit2, 
  Trophy, 
  Bot, 
  ShieldCheck,
  Download,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Navbar({ 
  user, 
  authLoading = false,
  language = 'hinglish', 
  setLanguage, 
  onOpenAuth, 
  onOpenProfile,
  onOpenApkModal,
  onLogout,
  activeTab,
  setActiveTab,
  isOffline
}) {
  const t = translations[language] || translations.hinglish;
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('sigma_theme') !== 'light';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Theme toggle
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

  // Close mobile menu when a tab is selected
  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Base navigation links
  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'roadmap', label: '139 Chapters', icon: BookOpen },
    { id: 'playground', label: 'Code Lab', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'chatbot', label: 'SigmaBot', icon: Bot },
  ];

  // PROBLEM 3: Only include Admin link if user is explicitly verified admin via Firestore
  const isVerifiedAdmin = Boolean(user && user.role === 'admin' && user.isAdminVerified === true);
  if (isVerifiedAdmin) {
    navLinks.push({ id: 'admin', label: 'Admin', icon: ShieldCheck });
  }

  // Display user helpers
  const displayName = user?.displayName || user?.name || (user?.email ? user.email.split('@')[0] : 'Dark Coder');
  const userInitials = (displayName || 'D').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080B16]/95 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Brand / Logo (Left) */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group shrink-0"
          >
            <img 
              src="./logo.png" 
              alt="Sigma Web Dev" 
              className="w-8 h-8 rounded-xl object-contain shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform shrink-0" 
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <h1 className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-blue-400 text-sm sm:text-base leading-tight truncate">
                  SIGMA WEB DEV
                </h1>
                <span 
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${isOffline ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} 
                  title={isOffline ? 'Offline Mode' : 'Online / Synced'} 
                />
              </div>
              <p className="text-[9px] text-slate-400 font-mono tracking-wider truncate hidden xs:block">
                DARK CODER • 139 CHAPTERS
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Center, lg:flex) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800/80 shrink-0">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls Area */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Professional APK Download Button */}
            <button
              onClick={onOpenApkModal}
              className="flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600/20 via-blue-600/20 to-cyan-500/10 hover:from-violet-600/30 hover:to-blue-600/30 border border-violet-500/40 hover:border-violet-400 text-violet-300 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95 shrink-0"
              title="Download Sigma Web Dev Android APK"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Download APK</span>
              <span className="sm:hidden text-[11px]">APK</span>
            </button>

            {/* Streak Counter (visible from sm up) */}
            <div 
              className="hidden sm:flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-full text-amber-400 text-xs font-bold shrink-0"
              title="Daily Learning Streak"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
              <span>{user ? user.streak || 1 : 0}</span>
            </div>

            {/* XP Counter (visible from sm up) */}
            <div 
              className="hidden sm:flex items-center space-x-1 bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded-full text-cyan-400 text-xs font-bold shrink-0"
              title="Experience Points (XP)"
            >
              <Zap className="w-3.5 h-3.5 fill-cyan-400" />
              <span>{user ? user.xp || 0 : 0}</span>
            </div>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0"
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Coder Theme'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-400" />}
            </button>

            {/* Language Selector (hidden on smallest screens, available in hamburger menu) */}
            <div className="relative hidden md:block shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-xl pl-2 pr-5 py-1.5 border border-slate-800 focus:outline-none focus:border-violet-500 cursor-pointer appearance-none"
              >
                <option value="hinglish">Hinglish</option>
                <option value="hi">हिंदी</option>
                <option value="en">English</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-slate-400 text-[9px]">
                ▼
              </div>
            </div>

            {/* PROBLEM 2: RESTORED ACCOUNT / PROFILE CONTROL */}
            {authLoading ? (
              // Loading state: avoids flickering
              <div 
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/60 animate-pulse shrink-0"
                title="Loading account..." 
              />
            ) : user ? (
              // Logged-in state: Profile avatar + Dropdown Menu
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-violet-400/50 hover:border-violet-300 shadow-md shadow-violet-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 overflow-hidden"
                  title={`${displayName} (${user.email || 'Student'})`}
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={displayName} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <span>{userInitials}</span>
                  )}
                </button>

                {/* Account Menu Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0D1222] border border-violet-500/30 shadow-2xl shadow-black/90 py-2.5 z-50 text-left">
                    {/* User Identity Header */}
                    <div className="px-4 py-2.5 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                          ) : (
                            userInitials
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate font-display">
                            {displayName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono truncate">
                            {user.email || 'student@sigmadev.io'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Level & XP Pills */}
                      <div className="mt-2.5 flex items-center space-x-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-bold">
                          Lvl {user.level || 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold">
                          {user.xp || 0} XP
                        </span>
                        {isVerifiedAdmin && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-1.5 pt-1.5 space-y-0.5 text-xs">
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/20 transition-all font-semibold"
                      >
                        <User className="w-3.5 h-3.5 text-violet-400" />
                        <span>My Profile & Badges</span>
                      </button>

                      {isVerifiedAdmin && (
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            handleNavClick('admin');
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-violet-600/20 transition-all font-semibold"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Admin Console</span>
                        </button>
                      )}

                      <div className="border-t border-slate-800/80 my-1" />

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>{t.logout || 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Logged-out state: Clearly visible Sign In button
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md shadow-violet-600/30 transition-all active:scale-95 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.login || 'Sign In'}</span>
              </button>
            )}

            {/* Mobile / Tablet Hamburger Toggle (lg:hidden) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all shrink-0"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-violet-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Drawer (lg:hidden) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1222]/98 border-b border-slate-800 px-4 py-4 space-y-3 shadow-2xl backdrop-blur-2xl">
          
          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Utility Controls: Language & Theme */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-mono text-[11px]">Lang:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-slate-900 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1 border border-slate-700"
              >
                <option value="hinglish">Hinglish</option>
                <option value="hi">हिंदी</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-mono text-[11px]">Theme:</span>
              <button
                onClick={toggleTheme}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center space-x-1"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-violet-400" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Account Action */}
          <div className="pt-2 border-t border-slate-800/80">
            {user ? (
              <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <div 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenProfile) onOpenProfile();
                  }}
                  className="flex items-center space-x-2.5 cursor-pointer min-w-0 flex-1"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      userInitials
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Lvl {user.level || 1} • {user.xp || 0} XP</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all shrink-0 ml-2"
                >
                  {t.logout || 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/30"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.login || 'Sign In / Register'}</span>
              </button>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
