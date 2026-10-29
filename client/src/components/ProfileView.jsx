import React, { useState } from 'react';
import { Award, Flame, Zap, CheckCircle2, LogOut, LogIn, Sparkles, BookOpen, Edit2, Check, X, ShieldCheck } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function ProfileView({ 
  user, 
  completedLessons, 
  onLogout, 
  onOpenAuth, 
  onUpdateProfile,
  language 
}) {
  const t = translations[language];
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleStartEdit = () => {
    setNameInput(user?.name || user?.displayName || '');
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    setIsSaving(true);
    if (onUpdateProfile) {
      await onUpdateProfile({ displayName: nameInput.trim() });
    }
    setIsSaving(false);
    setIsEditingName(false);
  };

  if (!user) {
    return (
      <div className="pb-24 pt-8 px-4 max-w-md mx-auto text-center space-y-5">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-3xl shadow-xl shadow-purple-500/20">
          🚀
        </div>
        <div>
          <h2 className="text-xl font-display font-black text-white">
            {language === 'hinglish' ? 'Apna Coder Account Banao!' : 'Join the Sigma Grind'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {language === 'hinglish' 
              ? 'Sign up karke XP save karo, badges unlock karo aur apni streak maintain karo.' 
              : 'Save your progress, maintain daily streaks, earn XP, and unlock developer badges.'}
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full max-w-xs mx-auto py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 hover:opacity-95 active:scale-95 transition-all"
        >
          <LogIn className="w-4 h-4" />
          <span>{t.login} / {t.signup}</span>
        </button>
      </div>
    );
  }

  const nextLevelXp = user.level * 150;
  const currentLevelProgress = (user.xp % 150) / 150 * 100;

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto space-y-4">
      {/* Profile Card */}
      <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 relative overflow-hidden shadow-xl">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-purple-500/30 border border-white/20">
            {(user.name || user.email || 'D').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center space-x-1.5 py-0.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-slate-900 border border-violet-500 rounded-lg px-2 py-1 text-xs text-white font-bold w-full focus:outline-none"
                  placeholder="Enter name..."
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  disabled={isSaving}
                  className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                  title="Save name"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="p-1 rounded-md bg-slate-800 text-slate-400 hover:text-white"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <h2 className="text-base font-display font-black text-white leading-tight truncate">
                  {user.name || user.displayName || user.email?.split('@')[0] || 'Dark Coder'}
                </h2>
                <button
                  onClick={handleStartEdit}
                  className="p-1 text-slate-500 hover:text-violet-400 transition-colors"
                  title="Edit display name"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold px-2 py-0.5 rounded-full shrink-0">
                  Lvl {user.level}
                </span>
                {user.isAdminVerified && (
                  <span className="text-[9px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 shrink-0">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>Admin</span>
                  </span>
                )}
              </div>
            )}
            <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{user.email}</p>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
            <span>Next Level: Lvl {user.level + 1}</span>
            <span className="text-cyan-400 font-bold">{user.xp} XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono">{t.streak}</p>
            <h4 className="text-base font-bold text-white">{user.streak} Days 🔥</h4>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono">{t.lessonsCompleted}</p>
            <h4 className="text-base font-bold text-white">{completedLessons.length} Done</h4>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
          <Award className="w-4 h-4" />
          <span>{t.badges}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {user.badges && user.badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center space-x-2 text-xs font-semibold text-purple-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span className="truncate">{badge}</span>
            </div>
          ))}
          {(!user.badges || user.badges.length === 0) && (
            <p className="text-xs text-slate-500 col-span-2">Complete lessons to earn badges!</p>
          )}
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="w-full py-2.5 rounded-xl bg-slate-900/80 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>{t.logout}</span>
      </button>
    </div>
  );
}

