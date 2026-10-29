// Firebase Cloud Firestore & Auth Client Configuration
// Graceful offline fallback: If Firebase credentials are not provided in environment variables,
// the platform seamlessly operates using localStorage so features never fail.

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForSigmaWebDevProduction01",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sigma-web-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sigma-web-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sigma-web-dev.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1029384756",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1029384756:web:darkcoderproduction"
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

export const getFirestoreSchemaInfo = () => ({
  collections: {
    users: {
      docId: "uid",
      fields: ["name", "email", "xp", "level", "streak", "badges", "createdAt"]
    },
    user_progress: {
      docId: "uid_lessonId",
      fields: ["userId", "lessonId", "completedAt", "quizScore"]
    },
    quiz_attempts: {
      docId: "autoId",
      fields: ["userId", "lessonId", "score", "passed", "timestamp"]
    },
    leaderboard: {
      docId: "uid",
      fields: ["displayName", "xp", "level", "badgesCount", "updatedAt"]
    }
  }
});