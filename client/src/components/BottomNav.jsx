import React from 'react';
import { Map, Code2, Bot, User, Trophy } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function BottomNav({ activeTab, setActiveTab, language }) {
  const t = translations[language] || translations.hinglish;

  const navItems = [
    { id: 'roadmap', label: t.roadmap || 'Roadmap', icon: Map },
    { id: 'playground', label: t.playground || 'Code Lab', icon: Code2 },
    { id: 'leaderboard', label: language === 'hi' ? 'रैंकिंग' : language === 'hinglish' ? 'Ranks 🏆' : 'Stats', icon: Trophy, isAccent: true },
    { id: 'chatbot', label: t.chatbot || 'SigmaBot', icon: Bot, isGlow: true },
    { id: 'profile', label: t.profile || 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 px-1.5 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all rounded-xl relative ${
                isActive ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-purple-500/20 shadow-lg shadow-purple-500/20' 
                  : item.isGlow 
                    ? 'bg-cyan-500/10' 
                    : item.isAccent
                      ? 'bg-yellow-500/10'
                      : ''
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  isActive 
                    ? 'stroke-[2.5] text-purple-400' 
                    : item.isGlow 
                      ? 'text-cyan-400 animate-pulse' 
                      : item.isAccent
                        ? 'text-yellow-400'
                        : 'stroke-[1.8]'
                }`} />
              </div>
              <span className="text-[9px] mt-1 tracking-tight truncate max-w-full px-0.5">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
