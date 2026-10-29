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
import { auth } from './firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { 
  fetchUserProfile, 
  createUserProfile, 
  mergeGuestAndCloudData, 
  saveUserProfile, 
  syncLeaderboardDoc, 
  verifyAdminStatus, 
  getLocalGuestProgress,
  flushDebouncedProfile
} from './services/firestoreService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'roadmap' | 'playground' | 'projects' | 'leaderboard' | 'chatbot' | 'profile' | 'admin'
  const [language, setLanguage] = useState('hinglish');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isApkOpen, setIsApkOpen] = useState(false);
  const [user, setUser] = useState(null); // Real Firebase authenticated user (null for guests)
  const [authLoading, setAuthLoading] = useState(true);
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

  // Listen to real Firebase Authentication state changes & sync with Cloud Firestore
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // 1. Check admin authorization against Firestore /admins/{uid}
          const isAdmin = await verifyAdminStatus(firebaseUser.uid);

          // Check if another UID was previously active on this browser
          const previousUid = localStorage.getItem('sigma_last_synced_uid');
          const isSameUserOrNewGuest = !previousUid || previousUid === firebaseUser.uid;

          // 2. Fetch existing cloud profile from Firestore users/{uid}
          const cloudProfile = await fetchUserProfile(firebaseUser.uid);

          // 3. Read current local guest progress (isolated to true guest or matching UID)
          const localGuestProgress = isSameUserOrNewGuest
            ? getLocalGuestProgress()
            : { completedChapters: ['sigma_001'], bookmarkedChapters: [], savedProjects: [], xp: 0, level: 1, streak: 1, badges: ['Sigma Rookie 🚀'] };

          let activeProfile;
          if (cloudProfile) {
            // 4. Non-destructive union merge of cloud and local guest data
            activeProfile = mergeGuestAndCloudData(cloudProfile, localGuestProgress);

            // Check if local guest had progress that wasn't in cloud
            const hasNewLessons = localGuestProgress.completedChapters.some(
              ch => !(cloudProfile.completedChapters || []).includes(ch)
            );
            const hasNewBookmarks = localGuestProgress.bookmarkedChapters.some(
              b => !(cloudProfile.bookmarkedChapters || []).includes(b)
            );
            const hasNewProjects = localGuestProgress.savedProjects.some(
              p => !(cloudProfile.savedProjects || []).some(cp => cp.id === p.id)
            );

            if (hasNewLessons || hasNewBookmarks || hasNewProjects) {
              saveUserProfile(firebaseUser.uid, {
                completedChapters: activeProfile.completedChapters,
                bookmarkedChapters: activeProfile.bookmarkedChapters,
                savedProjects: activeProfile.savedProjects,
                xp: activeProfile.xp,
                level: activeProfile.level,
                badges: activeProfile.badges
              });
            }
          } else {
            // 5. First-time registration or login: initialize cloud document with guest progress
            activeProfile = await createUserProfile(firebaseUser, localGuestProgress);
          }

          // Store current UID to prevent cross-account contamination
          localStorage.setItem('sigma_last_synced_uid', firebaseUser.uid);

          // 6. Update local caches for offline resilience
          localStorage.setItem('sigma_completed_chapters', JSON.stringify(activeProfile.completedChapters));
          localStorage.setItem('sigma_bookmarked_chapters', JSON.stringify(activeProfile.bookmarkedChapters));
          localStorage.setItem('sigma_saved_projects', JSON.stringify(activeProfile.savedProjects));

          if (!isMounted) return;

          setCompletedLessons(activeProfile.completedChapters);

          const displayName = firebaseUser.displayName || activeProfile.displayName || 
            (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Dark Coder');

          const userState = {
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: displayName,
            displayName: displayName,
            photoURL: firebaseUser.photoURL || activeProfile.photoURL || null,
            xp: activeProfile.xp || 50,
            level: activeProfile.level || 1,
            streak: activeProfile.streak || 1,
            badges: activeProfile.badges || ['Sigma Rookie 🚀'],
            completedChapters: activeProfile.completedChapters,
            bookmarkedChapters: activeProfile.bookmarkedChapters,
            savedProjects: activeProfile.savedProjects,
            role: isAdmin ? 'admin' : 'student',
            isAdminVerified: isAdmin
          };

          setUser(userState);

          // 7. Sync sanitized public entry to leaderboard
          syncLeaderboardDoc(userState, activeProfile.completedChapters.length);
          syncUserToLeaderboard(userState, activeProfile.completedChapters);

        } catch (syncErr) {
          console.warn('⚠️ [Firestore Auth Sync Warning]:', syncErr.message);
          if (!isMounted) return;
          const fallbackName = firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Dark Coder');
          setUser({
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: fallbackName,
            displayName: fallbackName,
            photoURL: firebaseUser.photoURL || null,
            xp: 50,
            level: 1,
            streak: 1,
            badges: ['Sigma Rookie 🚀'],
            role: 'student',
            isAdminVerified: false
          });
        }
      } else {
        if (!isMounted) return;
        // Guest user (unauthenticated)
        setUser(null);
        try {
          const saved = localStorage.getItem('sigma_completed_chapters');
          setCompletedLessons(saved ? JSON.parse(saved) : ['sigma_001']);
        } catch {
          setCompletedLessons(['sigma_001']);
        }
      }
      if (isMounted) setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleCompleteLesson = (chapterId, quizScore = 0) => {
    // 1. Maintain local offline chapters progress & prevent duplicate XP awards
    const isAlreadyCompleted = completedLessons.includes(chapterId);
    if (isAlreadyCompleted) {
      // Chapter was already completed; do not award duplicate XP
      return;
    }

    const updated = [...completedLessons, chapterId];

    setCompletedLessons(updated);
    try {
      localStorage.setItem('sigma_completed_chapters', JSON.stringify(updated));
    } catch {}

    // 2. Increment active session XP and badges
    setUser(prev => {
      if (!prev) return null;
      const newXp = (prev.xp || 0) + 60;
      const newLevel = Math.floor(newXp / 150) + 1;
      const updatedBadges = [...(prev.badges || ['Sigma Rookie 🚀'])];
      if (updated.length >= 5 && !updatedBadges.includes('CSS Alchemist 🎨')) {
        updatedBadges.push('CSS Alchemist 🎨');
      }
      if (updated.length >= 10 && !updatedBadges.includes('JS Sorcerer ⚡')) {
        updatedBadges.push('JS Sorcerer ⚡');
      }

      const updatedUser = {
        ...prev,
        xp: newXp,
        level: newLevel,
        badges: updatedBadges,
        completedChapters: updated
      };

      // 3. Sync to Cloud Firestore if authenticated
      if (prev.uid) {
        saveUserProfile(prev.uid, {
          completedChapters: updated,
          xp: newXp,
          level: newLevel,
          badges: updatedBadges
        });
        syncLeaderboardDoc(updatedUser, updated.length);
        syncUserToLeaderboard(updatedUser, updated);
      }

      return updatedUser;
    });
  };

  const handleAwardXp = (amount) => {
    setUser(prev => {
      if (!prev) return null;
      const newXp = (prev.xp || 0) + amount;
      const newLevel = Math.floor(newXp / 150) + 1;
      const updated = { ...prev, xp: newXp, level: newLevel };
      syncUserToLeaderboard(updated, completedLessons);
      if (prev.uid) {
        saveUserProfile(prev.uid, { xp: newXp, level: newLevel });
        syncLeaderboardDoc(updated, completedLessons.length);
      }
      return updated;
    });
  };

  const handleUpdateProfile = async (updatedFields) => {
    if (!user?.uid) return;
    try {
      if (auth.currentUser && updatedFields.displayName) {
        await updateProfile(auth.currentUser, { displayName: updatedFields.displayName });
      }
      await saveUserProfile(user.uid, updatedFields);
      setUser(prev => ({
        ...prev,
        ...updatedFields,
        name: updatedFields.displayName || prev.name,
        displayName: updatedFields.displayName || prev.displayName
      }));
    } catch (err) {
      console.warn('⚠️ Profile update warning:', err.message);
    }
  };

  const handleLogout = async () => {
    if (user?.uid) {
      await flushDebouncedProfile(user.uid);
    }
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Firebase signOut error:', err);
    }
    setUser(null);
    setCompletedLessons(['sigma_001']);
    localStorage.removeItem('sigma_last_synced_uid');
    localStorage.setItem('sigma_completed_chapters', JSON.stringify(['sigma_001']));
    localStorage.setItem('sigma_bookmarked_chapters', JSON.stringify([]));
    localStorage.setItem('sigma_saved_projects', JSON.stringify([]));
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
      {/* Desktop Device Simulator Toggle - Relocated to non-overlapping bottom-right floating pill */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-30 items-center space-x-2 bg-[#11182A]/95 border border-violet-500/40 px-3.5 py-1.5 rounded-full text-xs shadow-2xl backdrop-blur-md hover:border-violet-400 transition-all">
        <span className="text-slate-400 font-mono text-[11px]">View Mode:</span>
        <button
          onClick={() => setIsMobileFrame(false)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            !isMobileFrame ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Responsive</span>
        </button>
        <button
          onClick={() => setIsMobileFrame(true)}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-bold transition-all ${
            isMobileFrame ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' : 'text-slate-400 hover:text-white'
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
          authLoading={authLoading}
          language={language}
          setLanguage={setLanguage}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          onOpenApkModal={() => setIsApkOpen(true)}
          onLogout={handleLogout}
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
              user={user}
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
              user={user}
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
              onUpdateProfile={handleUpdateProfile}
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
            // State is canonically updated via onAuthStateChanged
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
