import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, AlertCircle, Loader2 } from 'lucide-react';
import { translations } from '../i18n/translations';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup 
} from 'firebase/auth';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, language }) {
  const t = translations[language] || translations.hinglish;
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Map Firebase errors to beginner-friendly, secure messages
  const mapFirebaseError = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return language === 'hi' 
          ? 'यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।'
          : language === 'hinglish'
          ? 'Yeh email pehle se registered hai bro. Please sign in karo!'
          : 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return language === 'hi'
          ? 'गलत ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।'
          : language === 'hinglish'
          ? 'Galat email ya password. Dobara check karke dalo bro!'
          : 'Invalid email or password. Please double check.';
      case 'auth/weak-password':
        return language === 'hi'
          ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।'
          : language === 'hinglish'
          ? 'Password kam se kam 6 characters ka hona chahiye.'
          : 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return language === 'hi'
          ? 'कृपया एक वैध ईमेल पता दर्ज करें।'
          : language === 'hinglish'
          ? 'Valid email address dalo bro (e.g. name@domain.com).'
          : 'Please enter a valid email address.';
      case 'auth/popup-closed-by-user':
        return ''; // User intentionally closed popup; no error needed
      case 'auth/network-request-failed':
        return language === 'hi'
          ? 'नेटवर्क समस्या। कृपया अपना इंटरनेट कनेक्शन जांचें।'
          : language === 'hinglish'
          ? 'Network problem hai bro. Apna internet check karo!'
          : 'Network error. Please check your internet connection.';
      case 'auth/too-many-requests':
        return language === 'hi'
          ? 'बहुत सारे प्रयास। कृपया कुछ समय बाद पुनः प्रयास करें।'
          : language === 'hinglish'
          ? 'Bahut zyada attempts ho gaye. Thodi der baad try karo.'
          : 'Too many unsuccessful attempts. Please try again later.';
      default:
        return language === 'hi'
          ? 'प्रमाणीकरण विफल रहा। कृपया पुनः प्रयास करें।'
          : language === 'hinglish'
          ? 'Authentication fail ho gaya. Please dobara try karo.'
          : 'Authentication failed. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || googleLoading) return; // Prevent duplicate submissions

    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (isLogin) {
        // 1. Real Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
        const fbUser = userCredential.user;
        if (onAuthSuccess) {
          onAuthSuccess({
            uid: fbUser.uid,
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || cleanEmail.split('@')[0],
            photoURL: fbUser.photoURL || null
          });
        }
      } else {
        // 2. Real Firebase Registration
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const fbUser = userCredential.user;
        const cleanName = name.trim() || cleanEmail.split('@')[0];
        
        // Update Firebase profile with display name
        if (cleanName) {
          try {
            await updateProfile(fbUser, { displayName: cleanName });
          } catch (profileErr) {
            console.warn('Profile name update warning:', profileErr);
          }
        }

        if (onAuthSuccess) {
          onAuthSuccess({
            uid: fbUser.uid,
            id: fbUser.uid,
            email: fbUser.email,
            name: cleanName,
            photoURL: fbUser.photoURL || null
          });
        }
      }

      setLoading(false);
      onClose();
    } catch (err) {
      console.error('Firebase Auth Error:', err.code, err.message);
      setError(mapFirebaseError(err.code));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading || googleLoading) return;

    setError('');
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      if (onAuthSuccess) {
        onAuthSuccess({
          uid: fbUser.uid,
          id: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Dark Coder',
          photoURL: fbUser.photoURL || null
        });
      }

      setGoogleLoading(false);
      onClose();
    } catch (err) {
      console.error('Google Auth Error:', err.code, err.message);
      const friendlyMsg = mapFirebaseError(err.code);
      if (friendlyMsg) setError(friendlyMsg);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm glass-panel border border-violet-500/30 rounded-2xl p-6 shadow-2xl relative glow-purple animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 mb-3 shadow-lg shadow-violet-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-display font-black text-white">
            {isLogin 
              ? (language === 'hi' ? 'लॉग इन करें' : language === 'hinglish' ? 'Sign In Karo Bro ⚡' : 'Welcome Back') 
              : (language === 'hi' ? 'नया खाता बनाएं' : language === 'hinglish' ? 'Sigma Squad Join Karo 🚀' : 'Create Account')}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {isLogin 
              ? 'Level up your web dev journey' 
              : 'Real-time cloud sync across your devices'}
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full py-2.5 px-4 mb-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-xs flex items-center justify-center space-x-2.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-slate-800" />
          <span className="px-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">or with email</span>
          <div className="flex-1 border-t border-slate-800" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
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
                  disabled={loading || googleLoading}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 disabled:opacity-50"
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
                disabled={loading || googleLoading}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 disabled:opacity-50"
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
                disabled={loading || googleLoading}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-violet-600/30 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 mt-1 flex items-center justify-center space-x-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
            <span>
              {loading 
                ? (isLogin ? 'Signing In...' : 'Creating Account...') 
                : isLogin 
                ? (language === 'hinglish' ? 'Let\'s Code! 🚀' : 'Sign In') 
                : (language === 'hinglish' ? 'Create Account ⚡' : 'Create Account')}
            </span>
          </button>
        </form>

        {/* Switch tab */}
        <div className="mt-4 text-center text-xs text-slate-400">
          {isLogin ? (
            <span>
              {language === 'hinglish' ? 'Naye coder ho? ' : 'Don\'t have an account? '}
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className="text-violet-400 hover:text-violet-300 font-bold ml-1"
              >
                {t.signup}
              </button>
            </span>
          ) : (
            <span>
              {language === 'hinglish' ? 'Already account hai? ' : 'Already have an account? '}
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className="text-violet-400 hover:text-violet-300 font-bold ml-1"
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
