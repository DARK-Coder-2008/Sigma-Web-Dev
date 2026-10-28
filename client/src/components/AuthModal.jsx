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

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('sigma_token', data.token);
      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                  placeholder="Aryan Dev"
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

