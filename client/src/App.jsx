import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AuthModal from './components/AuthModal';
import DownloadApkModal from './components/DownloadApkModal';
import HomeView from './components/HomeView';
import CourseRoadmap from './components/CourseRoadmap';
import CodePlayground from './components/CodePlayground';
import ProjectsView from './components/ProjectsView';
import LeaderboardView from './components/LeaderboardView';
import AiChatbot from './components/AiChatbot';
import ProfileView from './components/ProfileView';
import AdminPanel from './components/AdminPanel';
import { Smartphone, Monitor } from 'lucide-react';
import { chaptersData } from './data/chaptersData';
import { initAnalytics, trackAppInstall, syncUserToLeaderboard } from './services/analyticsService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'roadmap' | 'playground' | 'projects' | 'leaderboard' | 'chatbot' | 'profile' | 'admin'
  const [language, setLanguage] = useState('hinglish');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isApkOpen, setIsApkOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem('sigma_completed_chapters');
      return saved ? JSON.parse(saved) : ['sigma_001'];
    } catch {
      return ['sigma_001'];
    }
  });
  const [codeForPlayground, setCodeForPlayground] = useState(null);
  const [selectedCourseCat, setSelectedCourseCat] = useState('ALL');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Android PWA Install Event Listener & Analytics Init
  useEffect(() => {
    initAnalytics();

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('📱 Android PWA Install prompt ready');
    };

    const handleAppInstalled = () => {
      trackAppInstall();
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
      trackAppInstall();
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check user session
  useEffect(() => {
    // 1. Load local cached user first (instant offline & GitHub Pages support)
    const savedUser = localStorage.getItem('sigma_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    } else {
      // Create guest profile with existing progress
      const defaultUser = {
        id: 'usr_guest',
        name: 'Om Prakash Nayak',
        email: 'omprakashn682@gmail.com',
        xp: 485,
        streak: 1,
        level: 4,
        badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡'],
        createdAt: new Date().toISOString()
      };
      setUser(defaultUser);
      localStorage.setItem('sigma_current_user', JSON.stringify(defaultUser));
    }

    // 2. Sync with backend if server is active
    const token = localStorage.getItem('sigma_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('sigma_current_user', JSON.stringify(data.user));
            if (data.completedLessons && data.completedLessons.length > 0) {
              setCompletedLessons(prev => {
                const merged = Array.from(new Set([...prev, ...data.completedLessons]));
                localStorage.setItem('sigma_completed_chapters', JSON.stringify(merged));
                return merged;
              });
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleCompleteLesson = (chapterId, quizScore = 0) => {
    // 1. Immediately update offline localStorage state
    setCompletedLessons(prev => {
      const updated = prev.includes(chapterId) ? prev : [...prev, chapterId];
      try {
        localStorage.setItem('sigma_completed_chapters', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Award XP locally
    setUser(prev => {
      if (!prev) return prev;
      const newXp = (prev.xp || 50) + 60;
      const newLevel = Math.floor(newXp / 150) + 1;
      const updatedBadges = [...(prev.badges || ['Sigma Rookie 🚀'])];
      if (newXp >= 150 && !updatedBadges.includes('CSS Alchemist 🎨')) updatedBadges.push('CSS Alchemist 🎨');
      if (newXp >= 300 && !updatedBadges.includes('JS Sorcerer ⚡')) updatedBadges.push('JS Sorcerer ⚡');
      if (newXp >= 500 && !updatedBadges.includes('Sigma Fullstack God 👑')) updatedBadges.push('Sigma Fullstack God 👑');
      const updated = {
        ...prev,
        xp: newXp,
        level: newLevel,
        badges: updatedBadges
      };
      try {
        localStorage.setItem('sigma_current_user', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // 2. Sync to backend if online
    const token = localStorage.getItem('sigma_token');
    if (token && navigator.onLine) {
      fetch('/api/course/complete-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ lessonId: chapterId, quizScore })
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('sigma_current_user', JSON.stringify(data.user));
          }
        })
        .catch(() => {});
    }
  };

  const handleAwardXp = (amount) => {
    setUser(prev => {
      const current = prev || {
        id: 'usr_guest',
        name: 'Om Prakash Nayak',
        email: 'omprakashn682@gmail.com',
        xp: 485,
        level: 4,
        streak: 1,
        badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡']
      };
      const newXp = (current.xp || 50) + amount;
      const newLevel = Math.floor(newXp / 150) + 1;
      const updated = { ...current, xp: newXp, level: newLevel };
      try { localStorage.setItem('sigma_current_user', JSON.stringify(updated)); } catch {}
      syncUserToLeaderboard(updated, completedLessons);
      return updated;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('sigma_token');
    localStorage.removeItem('sigma_current_user');
    setUser(null);
    setActiveTab('home');
  };

  const handleOpenPlaygroundWithCode = (code) => {
    setCodeForPlayground(code);
    setActiveTab('playground');
  };

  return (
    <div className={`min-h-screen bg-[#080B16] text-[#F8FAFC] flex flex-col items-center justify-start ${
      isMobileFrame ? 'py-6 px-4 bg-[#05070e]' : ''
    }`}>
      {/* Desktop Device Simulator Toggle */}
      <div className="hidden lg:flex fixed top-4 right-4 z-50 items-center space-x-2 bg-[#11182A]/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs shadow-xl backdrop-blur-md">
        <span className="text-slate-400 font-mono text-[11px]">View Mode:</span>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            !isMobileFrame ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Responsive</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            isMobileFrame ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Frame</span>
        </button>
      </div>

      {/* Main Container / Responsive Shell */}
      <div className={`w-full relative transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-[420px] min-h-[840px] rounded-[44px] border-[8px] border-slate-800 shadow-[0_0_60px_rgba(139,92,246,0.25)] overflow-hidden bg-[#080B16]' 
          : 'w-full min-h-screen bg-[#080B16]'
      }`}>
        {/* Android Frame Top Notch Bar */}
        {isMobileFrame && (
          <div className="w-full bg-[#05070e] px-6 py-2 flex justify-between items-center text-[10px] text-slate-400 font-mono select-none">
            <span>20:15</span>
            <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center space-x-1">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Top Navbar */}
        <Navbar
          user={user}
          language={language}
          setLanguage={setLanguage}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          onOpenApkModal={() => setIsApkOpen(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOffline={isOffline}
        />

        {/* Tab Content View */}
        <main className="w-full">
          {activeTab === 'home' && (
            <HomeView
              user={user}
              completedLessons={completedLessons}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectCourse={(cat) => setSelectedCourseCat(cat)}
              onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
              language={language}
              onAwardXp={handleAwardXp}
            />
          )}

          {activeTab === 'roadmap' && (
            <CourseRoadmap
              completedLessons={completedLessons}
              onCompleteLesson={handleCompleteLesson}
              language={language}
              onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
              onOpenApkModal={() => setIsApkOpen(true)}
            />
          )}

          {activeTab === 'playground' && (
            <CodePlayground
              initialCode={codeForPlayground}
              language={language}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              onOpenPlaygroundWithCode={handleOpenPlaygroundWithCode}
              language={language}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView
              user={user}
              completedLessons={completedLessons}
              language={language}
              onAwardXp={handleAwardXp}
            />
          )}

          {activeTab === 'chatbot' && (
            <AiChatbot language={language} />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              completedLessons={completedLessons}
              onLogout={handleLogout}
              onOpenAuth={() => setIsAuthOpen(true)}
              language={language}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              user={user}
              completedLessons={completedLessons}
              language={language}
            />
          )}
        </main>

        {/* Bottom Mobile Navigation Dock */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuthSuccess={(loggedInUser) => {
            setUser(loggedInUser);
          }}
          language={language}
        />

        {/* Download APK / PWA Modal */}
        <DownloadApkModal
          isOpen={isApkOpen}
          onClose={() => setIsApkOpen(false)}
          deferredPrompt={deferredPrompt}
          language={language}
        />
      </div>
    </div>
  );
}