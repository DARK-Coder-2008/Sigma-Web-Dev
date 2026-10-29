// Cloud Firestore Synchronization Service for Sigma Web Dev - Dark Coder
// Handles profiles, progress, bookmarks, XP, badges, and Code Lab projects.
// Non-destructive: preserves local guest progress and merges without data loss.

import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase.js';

// Helper: safe local storage reader
const readLocalJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Helper: safe local storage writer
const writeLocalJson = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`LocalStorage write error for ${key}:`, err);
  }
};

/**
 * Gather current guest progress from localStorage
 */
export const getLocalGuestProgress = () => {
  return {
    completedChapters: readLocalJson('sigma_completed_chapters', ['sigma_001']),
    bookmarkedChapters: readLocalJson('sigma_bookmarked_chapters', []),
    savedProjects: readLocalJson('sigma_saved_projects', []),
    xp: 0,
    level: 1,
    streak: 1,
    badges: ['Sigma Rookie 🚀']
  };
};

/**
 * Non-destructive merge of cloud data and local guest data.
 * Guarantees that neither cloud nor local progress is overwritten or lost.
 */
export const mergeGuestAndCloudData = (cloudData = {}, localData = {}) => {
  // 1. Chapters union
  const cloudChapters = Array.isArray(cloudData.completedChapters) ? cloudData.completedChapters : [];
  const localChapters = Array.isArray(localData.completedChapters) ? localData.completedChapters : ['sigma_001'];
  const mergedChapters = Array.from(new Set([...cloudChapters, ...localChapters]));

  // 2. Bookmarks union
  const cloudBookmarks = Array.isArray(cloudData.bookmarkedChapters) ? cloudData.bookmarkedChapters : [];
  const localBookmarks = Array.isArray(localData.bookmarkedChapters) ? localData.bookmarkedChapters : [];
  const mergedBookmarks = Array.from(new Set([...cloudBookmarks, ...localBookmarks]));

  // 3. Badges union
  const cloudBadges = Array.isArray(cloudData.badges) && cloudData.badges.length > 0
    ? cloudData.badges 
    : ['Sigma Rookie 🚀'];
  const localBadges = Array.isArray(localData.badges) ? localData.badges : [];
  const mergedBadges = Array.from(new Set([...cloudBadges, ...localBadges]));

  // 4. Saved Projects merge (by ID; preserve both without duplicate IDs)
  const cloudProjects = Array.isArray(cloudData.savedProjects) ? cloudData.savedProjects : [];
  const localProjects = Array.isArray(localData.savedProjects) ? localData.savedProjects : [];
  const projectMap = new Map();
  // Cloud projects take initial slots
  cloudProjects.forEach(p => {
    if (p && p.id) projectMap.set(p.id, p);
  });
  // Local projects added if unique ID
  localProjects.forEach(p => {
    if (p && p.id && !projectMap.has(p.id)) {
      projectMap.set(p.id, p);
    }
  });
  const mergedProjects = Array.from(projectMap.values()).slice(0, 50); // Safe cap

  // 5. XP and Level (monotonic: never decrease)
  const baseCloudXp = typeof cloudData.xp === 'number' ? cloudData.xp : 0;
  const baseLocalXp = typeof localData.xp === 'number' ? localData.xp : 0;
  // If cloud had 0 XP but has completed chapters, calculate realistic XP
  const calculatedChapterXp = mergedChapters.length * 60;
  const mergedXp = Math.max(baseCloudXp, baseLocalXp, calculatedChapterXp, 50);
  const mergedLevel = Math.max(
    cloudData.level || 1, 
    localData.level || 1, 
    Math.floor(mergedXp / 150) + 1
  );

  // 6. Streak
  const mergedStreak = Math.max(cloudData.streak || 1, localData.streak || 1);

  return {
    ...cloudData,
    completedChapters: mergedChapters,
    bookmarkedChapters: mergedBookmarks,
    badges: mergedBadges,
    savedProjects: mergedProjects,
    xp: mergedXp,
    level: mergedLevel,
    streak: mergedStreak
  };
};

/**
 * Fetch a student's profile from Cloud Firestore users/{uid}
 */
export const fetchUserProfile = async (uid) => {
  if (!uid) return null;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.warn('⚠️ [Firestore] fetchUserProfile error (offline or uninitialized):', err.message);
    return null;
  }
};

/**
 * Verify whether an authenticated UID has admin rights.
 * Security design: Verified exclusively against Firestore /admins/{uid} collection.
 * Normal users cannot write to /admins (enforced by Security Rules).
 */
export const verifyAdminStatus = async (uid) => {
  if (!uid) return false;
  try {
    const adminDocRef = doc(db, 'admins', uid);
    const snap = await getDoc(adminDocRef);
    return snap.exists();
  } catch (err) {
    // If permission is denied or document does not exist, user is not admin
    return false;
  }
};

/**
 * Create a new user profile document in Firestore upon first sign in
 */
export const createUserProfile = async (firebaseUser, initialProgress = {}) => {
  if (!firebaseUser?.uid) return null;

  const defaultName = firebaseUser.displayName || 
    (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Dark Coder');

  const guestProgress = getLocalGuestProgress();
  const merged = mergeGuestAndCloudData({}, { ...guestProgress, ...initialProgress });

  const newProfile = {
    uid: firebaseUser.uid,
    displayName: defaultName,
    email: firebaseUser.email || '',
    photoURL: firebaseUser.photoURL || null,
    role: 'student', // Cannot be self-elevated to admin
    xp: merged.xp,
    level: merged.level,
    streak: merged.streak,
    badges: merged.badges,
    completedChapters: merged.completedChapters,
    bookmarkedChapters: merged.bookmarkedChapters,
    savedProjects: merged.savedProjects,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    await setDoc(userDocRef, newProfile);
  } catch (err) {
    console.warn('⚠️ [Firestore] createUserProfile warning:', err.message);
  }

  // Also update localStorage so local state reflects the verified profile
  writeLocalJson('sigma_completed_chapters', newProfile.completedChapters);
  writeLocalJson('sigma_bookmarked_chapters', newProfile.bookmarkedChapters);
  writeLocalJson('sigma_saved_projects', newProfile.savedProjects);

  return newProfile;
};

/**
 * Save / Update user progress in Firestore
 */
export const saveUserProfile = async (uid, updates = {}) => {
  if (!uid || !updates) return;

  // Security guard: strip immutable and protected fields
  const safeUpdates = { ...updates };
  delete safeUpdates.role;
  delete safeUpdates.isAdminVerified;
  delete safeUpdates.uid;
  delete safeUpdates.createdAt;

  // Defensive normalization: map legacy 'name' to 'displayName' to comply with Firestore allowedKeys
  if (safeUpdates.name && !safeUpdates.displayName) {
    safeUpdates.displayName = safeUpdates.name;
  }
  delete safeUpdates.name;

  safeUpdates.updatedAt = serverTimestamp();

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, safeUpdates, { merge: true });
  } catch (err) {
    console.warn('⚠️ [Firestore] saveUserProfile warning:', err.message);
  }
};

// Debounce state maps for accumulating pending updates per UID
const pendingUpdatesMap = new Map();
const debounceTimersMap = new Map();

/**
 * Flush all pending debounced updates immediately (e.g. before logout or navigation)
 */
export const flushDebouncedProfile = async (uid) => {
  if (!uid) return;
  if (debounceTimersMap.has(uid)) {
    clearTimeout(debounceTimersMap.get(uid));
    debounceTimersMap.delete(uid);
  }
  const pending = pendingUpdatesMap.get(uid);
  if (pending) {
    pendingUpdatesMap.delete(uid);
    await saveUserProfile(uid, pending);
  }
};

/**
 * Debounced profile sync for rapid interactions (e.g., bookmark toggling, code saving)
 * Accumulates updates across calls so multiple fast updates do not drop fields.
 */
export const debouncedSaveProfile = (uid, updates, delay = 600) => {
  if (!uid || !updates) return;

  // Accumulate pending updates
  const existing = pendingUpdatesMap.get(uid) || {};
  pendingUpdatesMap.set(uid, { ...existing, ...updates });

  if (debounceTimersMap.has(uid)) {
    clearTimeout(debounceTimersMap.get(uid));
  }

  const timer = setTimeout(() => {
    const finalUpdates = pendingUpdatesMap.get(uid);
    pendingUpdatesMap.delete(uid);
    debounceTimersMap.delete(uid);
    if (finalUpdates) {
      saveUserProfile(uid, finalUpdates);
    }
  }, delay);

  debounceTimersMap.set(uid, timer);
};

/**
 * Sync sanitized public student data to the leaderboard collection
 */
export const syncLeaderboardDoc = async (user, completedCount = 0) => {
  if (!user?.uid) return;
  try {
    const entry = {
      uid: user.uid,
      displayName: user.displayName || user.name || 'Dark Coder',
      photoURL: user.photoURL || null,
      xp: typeof user.xp === 'number' ? user.xp : 50,
      level: typeof user.level === 'number' ? user.level : 1,
      streak: typeof user.streak === 'number' ? user.streak : 1,
      badgesCount: Array.isArray(user.badges) ? user.badges.length : 1,
      completedCount: completedCount || (Array.isArray(user.completedChapters) ? user.completedChapters.length : 1),
      updatedAt: serverTimestamp()
    };
    const leadRef = doc(db, 'leaderboard', user.uid);
    await setDoc(leadRef, entry, { merge: true });
  } catch (err) {
    console.warn('⚠️ [Firestore] syncLeaderboardDoc warning:', err.message);
  }
};
