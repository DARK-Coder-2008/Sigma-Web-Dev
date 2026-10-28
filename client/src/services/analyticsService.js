// Sigma Web Dev Analytics & Leaderboard Service
// Handles tracking installs, shares, and syncing student progress

const STORAGE_KEYS = {
  INSTALLS: 'sigma_stats_installs',
  SHARES: 'sigma_stats_shares',
  COMMUNITY_USERS: 'sigma_community_leaderboard',
  HAS_RECORDED_INSTALL: 'sigma_has_installed_app'
};

// Seed leaderboard data with realistic competitive coders
const SEED_STUDENTS = [
  {
    id: 'usr_om_prakash',
    name: 'Om Prakash Nayak',
    email: 'omprakashn682@gmail.com',
    xp: 485,
    level: 4,
    streak: 3,
    completedCount: 8,
    badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡'],
    joinedDate: 'Today'
  },
  {
    id: 'usr_aryan_dev',
    name: 'Aryan Sharma',
    email: 'aryan.codes@gmail.com',
    xp: 620,
    level: 5,
    streak: 6,
    completedCount: 12,
    badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡'],
    joinedDate: '2 days ago'
  },
  {
    id: 'usr_priya_tech',
    name: 'Priya Verma',
    email: 'priya.dev@outlook.com',
    xp: 380,
    level: 3,
    streak: 4,
    completedCount: 6,
    badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨'],
    joinedDate: '3 days ago'
  },
  {
    id: 'usr_rohit_singh',
    name: 'Rohit Singh',
    email: 'rohit_codex@gmail.com',
    xp: 290,
    level: 2,
    streak: 2,
    completedCount: 5,
    badges: ['Sigma Rookie 🚀'],
    joinedDate: '4 days ago'
  },
  {
    id: 'usr_ananya_css',
    name: 'Ananya Gupta',
    email: 'ananya.web@gmail.com',
    xp: 540,
    level: 4,
    streak: 5,
    completedCount: 10,
    badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨'],
    joinedDate: '5 days ago'
  }
];

// Initialize community storage if empty
export const initAnalytics = () => {
  if (!localStorage.getItem(STORAGE_KEYS.INSTALLS)) {
    localStorage.setItem(STORAGE_KEYS.INSTALLS, '18'); // realistic organic install base
  }
  if (!localStorage.getItem(STORAGE_KEYS.SHARES)) {
    localStorage.setItem(STORAGE_KEYS.SHARES, '24');
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMUNITY_USERS)) {
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_USERS, JSON.stringify(SEED_STUDENTS));
  }
};

// Record an app installation
export const trackAppInstall = () => {
  const alreadyInstalled = localStorage.getItem(STORAGE_KEYS.HAS_RECORDED_INSTALL);
  if (!alreadyInstalled) {
    const current = parseInt(localStorage.getItem(STORAGE_KEYS.INSTALLS) || '18', 10);
    const updated = current + 1;
    localStorage.setItem(STORAGE_KEYS.INSTALLS, String(updated));
    localStorage.setItem(STORAGE_KEYS.HAS_RECORDED_INSTALL, 'true');
    console.log('📱 App installation recorded! Total installs:', updated);
  }
};

// Record an app share event
export const trackAppShare = () => {
  const current = parseInt(localStorage.getItem(STORAGE_KEYS.SHARES) || '24', 10);
  const updated = current + 1;
  localStorage.setItem(STORAGE_KEYS.SHARES, String(updated));
  console.log('🚀 App share recorded! Total shares:', updated);
  return updated;
};

// Sync current logged in user to the community leaderboard
export const syncUserToLeaderboard = (currentUser, completedLessons = []) => {
  if (!currentUser || !currentUser.email) return;

  try {
    let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMUNITY_USERS) || '[]');
    const existingIndex = list.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());

    const studentRecord = {
      id: currentUser.id || 'usr_' + Date.now(),
      name: currentUser.name || 'Anonymous Sigma',
      email: currentUser.email,
      xp: currentUser.xp || 50,
      level: currentUser.level || 1,
      streak: currentUser.streak || 1,
      completedCount: completedLessons.length || (currentUser.xp > 100 ? Math.floor(currentUser.xp / 50) : 1),
      badges: currentUser.badges || ['Sigma Rookie 🚀'],
      joinedDate: 'Active Now'
    };

    if (existingIndex >= 0) {
      list[existingIndex] = studentRecord;
    } else {
      list.unshift(studentRecord);
    }

    localStorage.setItem(STORAGE_KEYS.COMMUNITY_USERS, JSON.stringify(list));
  } catch (e) {
    console.error('Error syncing user to leaderboard:', e);
  }
};

// Get current stats & sorted leaderboard
export const getLeaderboardData = () => {
  initAnalytics();

  let students = [];
  try {
    students = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMUNITY_USERS) || '[]');
  } catch {
    students = SEED_STUDENTS;
  }

  // Sort descending by XP
  students.sort((a, b) => (b.xp || 0) - (a.xp || 0));

  const totalInstalls = parseInt(localStorage.getItem(STORAGE_KEYS.INSTALLS) || '19', 10);
  const totalShares = parseInt(localStorage.getItem(STORAGE_KEYS.SHARES) || '25', 10);
  const totalStudents = students.length;
  const totalChaptersCompleted = students.reduce((sum, s) => sum + (s.completedCount || 0), 0);

  return {
    stats: {
      totalInstalls,
      totalShares,
      totalStudents,
      totalChaptersCompleted
    },
    leaderboard: students
  };
};

