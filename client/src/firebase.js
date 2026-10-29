// Firebase App, Authentication & Cloud Firestore Initialization
// Target Firebase Project: sigma-web-dev11
// Safe initialization with Vite environment variables & duplicate prevention

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = (typeof import.meta !== 'undefined' && import.meta.env) 
  ? import.meta.env 
  : (typeof process !== 'undefined' && process.env ? process.env : {});

// 1. Read configuration from Vite environment variables (with non-breaking development fallbacks)
export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSy_PlaceholderKey_ConfigureInClientEnv',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'sigma-web-dev11.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'sigma-web-dev11',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'sigma-web-dev11.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1029384756',
  appId: env.VITE_FIREBASE_APP_ID || '1:1029384756:web:darkcoderproduction'
};

// 2. Configuration Validation Check (without exposing secret values)
const requiredEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingEnvKeys = requiredEnvKeys.filter((key) => {
  const val = env[key];
  return !val || val === 'your_firebase_api_key' || val.startsWith('your_');
});

export const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY &&
  env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key' &&
  !env.VITE_FIREBASE_API_KEY.startsWith('your_') &&
  env.VITE_FIREBASE_PROJECT_ID
);

if (!isFirebaseConfigured && env.DEV) {
  console.warn(
    `⚠️ [Firebase Initialization]: Incomplete or placeholder environment variables detected in client/.env. ` +
    `Missing/Unconfigured keys: [${missingEnvKeys.join(', ')}]. ` +
    'Please ensure client/.env uses standard Vite format (e.g. VITE_FIREBASE_API_KEY=AIzaSy...).'
  );
}

// 3. Safe initialization pattern (prevents duplicate initialization during Vite HMR)
export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// 4. Initialize and export Authentication & Firestore instances
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// 5. Schema blueprint for upcoming collection sync
export const getFirestoreSchemaInfo = () => ({
  collections: {
    users: {
      docId: 'uid',
      fields: ['name', 'email', 'role', 'xp', 'level', 'streak', 'badges', 'createdAt']
    },
    projects: {
      docId: 'projectId',
      fields: ['userId', 'name', 'html', 'css', 'js', 'savedAt']
    },
    quiz_attempts: {
      docId: 'autoId',
      fields: ['userId', 'chapterId', 'score', 'timestamp']
    },
    leaderboard: {
      docId: 'uid',
      fields: ['displayName', 'xp', 'level', 'badgesCount', 'updatedAt']
    }
  }
});
