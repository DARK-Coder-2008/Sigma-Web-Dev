import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, language }) {
  const t = translations[language];
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    let authUser = null;

    // 1. Try server login/register if server is available
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email: cleanEmail, password } : { name, email: cleanEmail, password };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.user) {
          authUser = data.user;
          localStorage.setItem('sigma_token', data.token || 'server_token');
        } else if (!res.ok && data.error) {
          throw new Error(data.error);
        }
      }
    } catch (err) {
      // If error was a real server validation error (e.g. wrong password), show it
      if (err.message && !err.message.includes('JSON') && !err.message.includes('fetch') && !err.message.includes('abort')) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    // 2. Fallback to Local In-Browser Auth (Offline & GitHub Pages Ready)
    if (!authUser) {
      let localUsers = {};
      try {
        localUsers = JSON.parse(localStorage.getItem('sigma_local_users') || '{}');
      } catch {
        localUsers = {};
      }

      // Check if user already exists locally
      if (localUsers[cleanEmail]) {
        authUser = localUsers[cleanEmail];
      } else {
        // Derive name from email or input
        const displayName = name.trim() || cleanEmail.split('@')[0].replace(/[._]/g, ' ');
        const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

        authUser = {
          id: 'usr_' + Date.now(),
          name: capitalizedName,
          email: cleanEmail,
          xp: cleanEmail === 'omprakashn682@gmail.com' ? 485 : 50,
          streak: 1,
          level: cleanEmail === 'omprakashn682@gmail.com' ? 4 : 1,
          badges: cleanEmail === 'omprakashn682@gmail.com' 
            ? ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡']
            : ['Sigma Rookie 🚀'],
          createdAt: new Date().toISOString()
        };

        localUsers[cleanEmail] = authUser;
        localStorage.setItem('sigma_local_users', JSON.stringify(localUsers));
      }

      localStorage.setItem('sigma_token', 'local_token_' + Date.now());
    }

    // Persist current session
    localStorage.setItem('sigma_current_user', JSON.stringify(authUser));
    onAuthSuccess(authUser);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel border border-purple-500/30 rounded-2xl p-6 shadow-2xl relative glow-purple animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mb-3 shadow-lg shadow-purple-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-display font-black text-white">
            {isLogin ? (language === 'hi' ? 'लॉग इन करें' : language === 'hinglish' ? 'Sign In Karo Bro ⚡' : 'Welcome Back') : (language === 'hi' ? 'नया खाता बनाएं' : language === 'hinglish' ? 'Sigma Squad Join Karo 🚀' : 'Create Account')}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {isLogin ? 'Level up your web dev journey' : 'Start with +50 XP bonus on signup!'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Om Prakash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="developer@genz.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Cooking...' : isLogin ? (language === 'hinglish' ? 'Let\'s Code! 🚀' : 'Sign In') : (language === 'hinglish' ? 'Claim +50 XP & Start ⚡' : 'Create Account')}
          </button>
        </form>

        {/* Switch tab */}
        <div className="mt-5 text-center text-xs text-slate-400">
          {isLogin ? (
            <span>
              {language === 'hinglish' ? 'Naye coder ho? ' : 'Don\'t have an account? '}
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className="text-purple-400 hover:text-purple-300 font-bold ml-1"
              >
                {t.signup}
              </button>
            </span>
          ) : (
            <span>
              {language === 'hinglish' ? 'Already account hai? ' : 'Already have an account? '}
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className="text-purple-400 hover:text-purple-300 font-bold ml-1"
              >
                {t.login}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
