import React from 'react';
import { Home, Map, Code2, FolderGit2, Bot, User, Trophy } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function BottomNav({ activeTab, setActiveTab, language }) {
  const t = translations[language] || translations.hinglish;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'roadmap', label: 'Chapters', icon: Map },
    { id: 'playground', label: 'Code Lab', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'chatbot', label: 'SigmaBot', icon: Bot, isGlow: true },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080B16]/95 backdrop-blur-2xl border-t border-slate-800/80 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-6 px-1 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all rounded-xl relative ${
                isActive ? 'text-violet-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-violet-500/20 shadow-lg shadow-violet-500/20' 
                  : item.isGlow 
                    ? 'bg-cyan-500/10' 
                    : ''
              }`}>
                <Icon className={`w-4 h-4 ${
                  isActive 
                    ? 'stroke-[2.5] text-violet-400' 
                    : item.isGlow 
                      ? 'text-cyan-400 animate-pulse' 
                      : 'stroke-[1.8]'
                }`} />
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight truncate max-w-full px-0.5">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-5 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}