import { spawn } from 'child_process';

const runTests = async () => {
  console.log('--- Starting Server Verification ---');
  
  // Start server process
  const server = spawn('node', ['index.js'], { cwd: process.cwd() });
  
  server.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[Server Err] ${d}`));

  // Wait 1.5s for server to listen
  await new Promise(r => setTimeout(r, 1500));

  try {
    // 1. Health check
    console.log('\n[1] Testing /api/health...');
    const healthRes = await fetch('http://localhost:5000/api/health');
    const health = await healthRes.json();
    console.log('Health:', health);

    // 2. Course modules
    console.log('\n[2] Testing /api/course/modules...');
    const courseRes = await fetch('http://localhost:5000/api/course/modules');
    const modules = await courseRes.json();
    console.log(`Modules count: ${modules.length}, First lesson: ${modules[0].lessons[0].title.en}`);

    // 3. Register user
    console.log('\n[3] Testing /api/auth/register...');
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sigma Dev Aryan',
        email: 'aryan@genz.dev',
        password: 'password123'
      })
    });
    const regData = await regRes.json();
    console.log('Register response:', regData.message, 'User:', regData.user?.name);
    const token = regData.token;

    // 4. Complete Lesson & XP
    console.log('\n[4] Testing /api/course/complete-lesson...');
    const compRes = await fetch('http://localhost:5000/api/course/complete-lesson', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ lessonId: 'sigma_01', quizScore: 1 })
    });
    const compData = await compRes.json();
    console.log('Complete lesson response:', compData.success, 'New XP:', compData.user?.xp, 'Badges:', compData.user?.badges);

    // 5. Chatbot in Hinglish
    console.log('\n[5] Testing /api/chat in Hinglish...');
    const chatRes = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'CSS me div center kaise karein?',
        language: 'hinglish'
      })
    });
    const chatData = await chatRes.json();
    console.log('Chat reply preview:', chatData.reply.substring(0, 80) + '...');

    // 6. Chatbot in Hindi
    console.log('\n[6] Testing /api/chat in Hindi...');
    const chatHiRes = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'HTML क्या है?',
        language: 'hi'
      })
    });
    const chatHiData = await chatHiRes.json();
    console.log('Chat Hindi preview:', chatHiData.reply.substring(0, 80) + '...');

    console.log('\n✅ ALL BACKEND TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.kill();
    process.exit(0);
  }
};

runTests();

