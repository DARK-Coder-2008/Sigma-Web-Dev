import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AuthModal from './components/AuthModal';
import DownloadApkModal from './components/DownloadApkModal';
import CourseRoadmap from './components/CourseRoadmap';
import CodePlayground from './components/CodePlayground';
import AiChatbot from './components/AiChatbot';
import ProfileView from './components/ProfileView';
import { Smartphone, Monitor } from 'lucide-react';
import { chaptersData } from './data/chaptersData';

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
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
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Android PWA Install Event Listener
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('📱 Android PWA Install prompt ready');
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check user session
  useEffect(() => {
    const token = localStorage.getItem('sigma_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
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
    if (user) {
      setUser(prev => {
        if (!prev) return prev;
        const newXp = (prev.xp || 50) + 60;
        return {
          ...prev,
          xp: newXp,
          level: Math.floor(newXp / 150) + 1
        };
      });
    }

    // 2. Sync to backend if online and user logged in
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
          if (data && data.user) setUser(data.user);
        })
        .catch(() => {});
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sigma_token');
    setUser(null);
    setActiveTab('roadmap');
  };

  const handleOpenPlaygroundWithCode = (code) => {
    setCodeForPlayground(code);
    setActiveTab('playground');
  };

  return (
    <div className={`min-h-screen bg-[#070b12] text-slate-100 flex flex-col items-center justify-start ${
      isMobileFrame ? 'py-6 px-4' : ''
    }`}>
      {/* Desktop Device Simulator Toggle */}
      <div className="hidden lg:flex fixed top-4 right-4 z-50 items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs shadow-xl backdrop-blur-md">
        <span className="text-slate-400 font-mono text-[11px]">View Mode:</span>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            !isMobileFrame ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            isMobileFrame ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Frame</span>
        </button>
      </div>

      {/* Main Container / Android Shell */}
      <div className={`w-full relative transition-all duration-300 ${
        isMobileFrame 
          ? 'max-w-[410px] min-h-[820px] rounded-[44px] border-[8px] border-slate-800 shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden bg-[#090d16]' 
          : 'max-w-md min-h-screen bg-[#090d16] border-x border-slate-800/50 shadow-2xl'
      }`}>
        {/* Android Frame Top Notch Bar */}
        {isMobileFrame && (
          <div className="w-full bg-slate-950 px-6 py-2 flex justify-between items-center text-[10px] text-slate-400 font-mono select-none">
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
          isOffline={isOffline}
        />

        {/* Tab Content View */}
        <main className="w-full">
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
