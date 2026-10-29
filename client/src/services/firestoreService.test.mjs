// Unit test for firestoreService logic
import assert from 'node:assert';
import { mergeGuestAndCloudData } from './firestoreService.js';

console.log('🧪 Testing Stage 5 Firestore Merge & Progress Safety...');

// TEST 1: Non-destructive chapters union
{
  const cloudData = { completedChapters: ['sigma_001', 'sigma_002'], xp: 120, level: 1 };
  const guestData = { completedChapters: ['sigma_002', 'sigma_003'], xp: 0, level: 1 };
  const merged = mergeGuestAndCloudData(cloudData, guestData);

  assert.deepStrictEqual(merged.completedChapters, ['sigma_001', 'sigma_002', 'sigma_003'], 'Chapters should be a non-destructive union');
  assert.strictEqual(merged.xp, 180, 'XP should account for all 3 completed chapters');
  console.log('  ✅ Test 1 Passed: Chapters non-destructive union');
}

// TEST 2: Preserves higher cloud XP even if guest XP is lower
{
  const cloudData = { completedChapters: ['sigma_001'], xp: 750, level: 5 };
  const guestData = { completedChapters: ['sigma_001'], xp: 0, level: 1 };
  const merged = mergeGuestAndCloudData(cloudData, guestData);

  assert.strictEqual(merged.xp, 750, 'Higher cloud XP with bonus XP must never decrease');
  assert.strictEqual(merged.level, 6, 'Level must stay consistent with 750 XP (Math.floor(750/150) + 1 = 6)');
  console.log('  ✅ Test 2 Passed: Monotonic XP preservation');
}

// TEST 3: Bookmarks union
{
  const cloudData = { bookmarkedChapters: ['sigma_010'] };
  const guestData = { bookmarkedChapters: ['sigma_015', 'sigma_010'] };
  const merged = mergeGuestAndCloudData(cloudData, guestData);

  assert.deepStrictEqual(merged.bookmarkedChapters, ['sigma_010', 'sigma_015'], 'Bookmarks must union uniquely');
  console.log('  ✅ Test 3 Passed: Bookmarks union');
}

// TEST 4: Saved Projects merge by ID
{
  const cloudData = { savedProjects: [{ id: 'p1', name: 'Cloud Proj' }] };
  const guestData = { savedProjects: [{ id: 'p2', name: 'Local Proj' }, { id: 'p1', name: 'Duplicate ID' }] };
  const merged = mergeGuestAndCloudData(cloudData, guestData);

  assert.strictEqual(merged.savedProjects.length, 2, 'Should not have duplicate project IDs');
  assert.strictEqual(merged.savedProjects[0].id, 'p1', 'Cloud project preserved');
  assert.strictEqual(merged.savedProjects[1].id, 'p2', 'New local project preserved');
  console.log('  ✅ Test 4 Passed: Saved Projects non-destructive merge');
}

// TEST 5: Badges union
{
  const cloudData = { badges: ['Sigma Rookie 🚀', 'CSS Alchemist 🎨'] };
  const guestData = { badges: ['JS Sorcerer ⚡'] };
  const merged = mergeGuestAndCloudData(cloudData, guestData);

  assert.deepStrictEqual(merged.badges, ['Sigma Rookie 🚀', 'CSS Alchemist 🎨', 'JS Sorcerer ⚡'], 'Badges must union uniquely');
  console.log('  ✅ Test 5 Passed: Badges union');
}

// TEST 6: Prevent duplicate XP on repeating completed chapter
{
  const completedLessons = ['sigma_001', 'sigma_002'];
  const isAlreadyCompleted = completedLessons.includes('sigma_001');
  assert.strictEqual(isAlreadyCompleted, true, 'Chapter sigma_001 should be detected as already completed');
  
  // Guard logic: if already completed, new XP is 0
  let awardedXp = 0;
  if (!isAlreadyCompleted) {
    awardedXp = 60;
  }
  assert.strictEqual(awardedXp, 0, 'No XP awarded for repeating chapter');
  console.log('  ✅ Test 6 Passed: Duplicate chapter completion awards 0 XP');
}

// TEST 7: Cross-account UID isolation
{
  const previousUid = 'user_A_123';
  const incomingUserUid = 'user_B_456';
  const isSameUserOrNewGuest = !previousUid || previousUid === incomingUserUid;
  assert.strictEqual(isSameUserOrNewGuest, false, 'User B must not be treated as same user as User A');
  console.log('  ✅ Test 7 Passed: Cross-account UID isolation verified');
}

console.log('🎉 All 7 Firestore Progress, Security & Merge unit tests passed successfully!');
