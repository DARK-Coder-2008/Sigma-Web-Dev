import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Smartphone, 
  Share2, 
  Users, 
  BookOpen, 
  Flame, 
  Zap, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink,
  Crown,
  Medal,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLeaderboardData, trackAppShare, syncUserToLeaderboard } from '../services/analyticsService';

export default function LeaderboardView({ user, completedLessons, language, onAwardXp }) {
  const [analyticsData, setAnalyticsData] = useState(() => getLeaderboardData());
  const [copied, setCopied] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  useEffect(() => {
    if (user) {
      syncUserToLeaderboard(user, completedLessons);
    }
    setAnalyticsData(getLeaderboardData());
  }, [user, completedLessons]);

  const appShareUrl = "https://dark-coder-2008.github.io/Sigma-Web-Dev/";
  const shareMessage = `🔥 Bhai yeh Sigma Web Dev app check kar! CodeWithHarry ke pure 139 chapters, theory, offline code runner aur AI chatbot ke sath hai. Free me install kar le yahan se:\n${appShareUrl}`;

  const handleShare = async () => {
    trackAppShare();
    if (onAwardXp) onAwardXp(20); // award 20 XP for sharing

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sigma Web Dev - Gen-Z Learning App',
          text: shareMessage,
          url: appShareUrl
        });
      } catch (err) {
        // Fallback to copy
      }
    } else {
      navigator.clipboard.writeText(`${shareMessage}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }

    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 3000);
    setAnalyticsData(getLeaderboardData());
  };

  const handleWhatsAppShare = () => {
    trackAppShare();
    if (onAwardXp) onAwardXp(20);
    setAnalyticsData(getLeaderboardData());
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(waUrl, '_blank');
  };

  const { stats, leaderboard } = analyticsData;

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto space-y-4 text-left">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-yellow-500/30 relative overflow-hidden shadow-xl bg-gradient-to-br from-yellow-950/20 via-purple-950/30 to-slate-900">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold">
            <Trophy className="w-3 h-3" />
            <span>Community & Analytics</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Sync</span>
          </span>
        </div>

        <h2 className="text-lg font-display font-black text-white mt-2 leading-tight">
          {language === 'hi' 
            ? 'लीडरबोर्ड और ऐप एनालिटिक्स 🏆' 
            : language === 'hinglish' 
            ? 'App Analytics & Leaderboard 🏆' 
            : 'App Analytics & Global Rankings'}
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          {language === 'hinglish' 
            ? 'Dekhein kitne logo ne app install kiya, share kiya aur sabka live progress!' 
            : 'Track total app installs, shares, and real-time student learning progress.'}
        </p>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Installs */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 shadow-md">
          <div className="flex items-center space-x-2 text-cyan-400 mb-1">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400">Total Installs</span>
          </div>
          <h3 className="text-xl font-display font-black text-white mt-1">
            {stats.totalInstalls} <span className="text-xs font-normal text-cyan-400 font-mono">users</span>
          </h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Android WebAPK & PWA</p>
        </div>

        {/* Shares */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-purple-500/30 shadow-md">
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400">Total Shares</span>
          </div>
          <h3 className="text-xl font-display font-black text-white mt-1">
            {stats.totalShares} <span className="text-xs font-normal text-purple-400 font-mono">times</span>
          </h3>
          <p className="text-[9px] text-slate-500 mt-0.5">WhatsApp & Direct links</p>
        </div>

        {/* Total Students */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400">Active Students</span>
          </div>
          <h3 className="text-xl font-display font-black text-white mt-1">
            {stats.totalStudents} <span className="text-xs font-normal text-indigo-400 font-mono">coders</span>
          </h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Registered on Leaderboard</p>
        </div>

        {/* Chapters Done */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 text-emerald-400 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400">Chapters Solved</span>
          </div>
          <h3 className="text-xl font-display font-black text-white mt-1">
            {stats.totalChaptersCompleted} <span className="text-xs font-normal text-emerald-400 font-mono">done</span>
          </h3>
          <p className="text-[9px] text-slate-500 mt-0.5">Across all 139 modules</p>
        </div>
      </div>

      {/* Share With Friends Action Card */}
      <div className="p-4 rounded-2xl glass-card border border-purple-500/30 space-y-3 glow-purple">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h4 className="text-xs font-bold text-white">
              {language === 'hinglish' ? 'Dosto Ke Sath Share Karein (+20 XP ⚡)' : 'Share with Friends (+20 XP)'}
            </h4>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">Earn XP</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {language === 'hinglish'
            ? 'WhatsApp ya Instagram par share karein taaki aur bhi dost Sigma course free me padh sakein!'
            : 'Share this link to invite fellow developers and boost your community reach!'}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleWhatsAppShare}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <span>WhatsApp Share 📲</span>
          </button>
          <button
            onClick={handleShare}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
        </div>

        {sharedToast && (
          <p className="text-center text-[10px] text-yellow-400 font-bold animate-bounce">
            🎉 +20 Bonus XP Added for Sharing! Total Shares Updated!
          </p>
        )}
      </div>

      {/* Community Leaderboard Table */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <h3 className="text-xs font-display font-bold text-white">
              {language === 'hinglish' ? 'Global Sigma Leaderboard' : 'Student Progress Leaderboard'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-purple-400 font-bold">
            Ranked by XP
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {leaderboard.map((student, idx) => {
            const isCurrentUser = user && user.email && student.email && user.email.toLowerCase() === student.email.toLowerCase();
            const rank = idx + 1;

            return (
              <div
                key={student.id || idx}
                className={`p-3.5 flex items-center justify-between transition-colors ${
                  isCurrentUser 
                    ? 'bg-purple-900/30 border-l-4 border-l-purple-500' 
                    : 'hover:bg-slate-900/40'
                }`}
              >
                {/* Left: Rank & Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="w-6 text-center font-black text-xs font-mono">
                    {rank === 1 ? (
                      <span className="text-yellow-400 text-sm">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-slate-300 text-sm">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-amber-600 text-sm">🥉</span>
                    ) : (
                      <span className="text-slate-500">#{rank}</span>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-sm flex-shrink-0">
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-xs font-bold text-white leading-tight">
                        {student.name}
                      </h4>
                      {isCurrentUser && (
                        <span className="text-[9px] bg-purple-500/20 border border-purple-500/40 text-purple-300 px-1.5 py-0.2 rounded-md font-bold">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                      <span>Lvl {student.level}</span>
                      <span>•</span>
                      <span className="text-amber-400 flex items-center space-x-0.5">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        <span>{student.streak}d</span>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">
                        {student.completedCount} / 139 Done
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: XP Score */}
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 text-cyan-400 font-mono font-bold text-xs">
                    <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                    <span>{student.xp} XP</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                    {student.joinedDate || 'Active'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

