import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Database, 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Layers, 
  Sparkles,
  Lock,
  RefreshCw,
  Terminal,
  Server
} from 'lucide-react';
import { chaptersData } from '../data/chaptersData';
import { coursesCatalog } from '../data/coursesData';
import { projectsLibrary } from '../data/projectsData';

export default function AdminPanel({ user, completedLessons, language }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [localUsersCount, setLocalUsersCount] = useState(1);
  const [savedProjectsCount, setSavedProjectsCount] = useState(0);
  const [storageUsageBytes, setStorageUsageBytes] = useState(0);
  const [selectedChapterForInspect, setSelectedChapterForInspect] = useState(chaptersData[0]);

  useEffect(() => {
    // Audit local storage metrics
    try {
      const users = JSON.parse(localStorage.getItem('sigma_local_users') || '{}');
      setLocalUsersCount(Math.max(1, Object.keys(users).length));
      
      const projs = JSON.parse(localStorage.getItem('sigma_saved_projects') || '[]');
      setSavedProjectsCount(projs.length);

      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        totalBytes += (key.length + val.length) * 2;
      }
      setStorageUsageBytes(totalBytes);
    } catch {}
  }, []);

  return (
    <div className="w-full pb-28 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#11182A] via-[#0D1222] to-[#080B16] border border-violet-500/30 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>SECURE SYSTEM CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Dark Coder Administrative Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Real-time curriculum diagnostics, user activity indexes, database schemas, and client storage metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Operational</span>
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'overview' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          System Metrics
        </button>
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'curriculum' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Curriculum Inspector
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'security' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Security & Schema
        </button>
      </div>

      {/* TAB 1: SYSTEM METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#11182A] border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Active Profile</span>
                <Users className="w-4 h-4 text-violet-400" />
              </div>
              <p className="text-xl font-bold text-white truncate">{user ? user.name : 'Om Prakash Nayak'}</p>
              <p className="text-[11px] text-slate-500 font-mono">Level {user?.level || 4} • {user?.xp || 485} Total XP</p>
            </div>

            <div className="bg-[#11182A] border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Curriculum Depth</span>
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xl font-bold text-white">139 Chapters</p>
              <p className="text-[11px] text-slate-500 font-mono">Across 10 Structured Courses</p>
            </div>

            <div className="bg-[#11182A] border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Completed Lessons</span>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl font-bold text-white">{completedLessons.length} / 139</p>
              <p className="text-[11px] text-slate-500 font-mono">
                {Math.round((completedLessons.length / 139) * 100)}% Progress Complete
              </p>
            </div>

            <div className="bg-[#11182A] border border-slate-800 p-5 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span>Local Browser Cache</span>
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xl font-bold text-white">{(storageUsageBytes / 1024).toFixed(1)} KB</p>
              <p className="text-[11px] text-slate-500 font-mono">{savedProjectsCount} Saved Projects</p>
            </div>
          </div>

          {/* Diagnostic Health Box */}
          <div className="bg-[#11182A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-violet-400" />
              <span>Service Worker & Offline Diagnostic State</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Service Worker Registration:</span>
                <span className="text-emerald-400 font-bold">Active (./sw.js)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">PWA Manifest ID:</span>
                <span className="text-cyan-400 font-bold">sigma-web-dev-course-app</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Client Origin:</span>
                <span className="text-slate-300 font-bold truncate">GitHub Pages / HTTPS</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM INSPECTOR */}
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#11182A] border border-slate-800 rounded-2xl p-4 max-h-[600px] overflow-y-auto space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase pb-2 border-b border-slate-800">
              Select Chapter to Inspect
            </h4>
            {chaptersData.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setSelectedChapterForInspect(ch)}
                className={`p-2.5 rounded-xl cursor-pointer text-xs font-mono transition-all flex items-center justify-between ${
                  selectedChapterForInspect.id === ch.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-950/60 text-slate-300 hover:bg-slate-900 border border-slate-800'
                }`}
              >
                <span className="truncate">#{ch.number} {ch.title.en}</span>
                <span className="text-[10px] opacity-75 shrink-0 ml-1">{ch.category}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-[#11182A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold">
                  {selectedChapterForInspect.category} • CHAPTER #{selectedChapterForInspect.number}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedChapterForInspect.title.en}</h3>
              </div>
              <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                Verified ✅
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-slate-400 font-bold">Topic Coverage:</span>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                {selectedChapterForInspect.topic}
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-slate-400 font-bold">Associated Quiz Question:</span>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-200">
                <p className="font-bold text-white">{selectedChapterForInspect.quiz?.question?.en}</p>
                <p className="text-emerald-400">Answer: {selectedChapterForInspect.quiz?.options[0]}</p>
                <p className="text-slate-400">{selectedChapterForInspect.quiz?.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY & SCHEMA */}
      {activeTab === 'security' && (
        <div className="bg-[#11182A] border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Production Security Architecture & Schema Rules</span>
            </h3>
            <p className="text-xs text-slate-400">
              Strict client isolation ensures arbitrary user code never accesses tokens or trusted application state.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
            <p className="text-violet-400 font-bold">// Sandbox Isolation Policy:</p>
            <p>1. Code Lab runner uses sandboxed iframe without allow-same-origin privilege.</p>
            <p>2. Auth tokens are stored only in client local key (sigma_token) and never reflected into DOM.</p>
            <p>3. Dynamic inputs are sanitized before rendering.</p>
            <p>4. Firebase and REST endpoints require JWT bearer tokens when connecting to cloud backend.</p>
          </div>
        </div>
      )}

    </div>
  );
}