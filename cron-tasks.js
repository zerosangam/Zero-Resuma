// cron-tasks.js
const cron = require('node-cron');

/**
 * Configuration
 * Replace with your actual Render service URL or define RENDER_EXTERNAL_URL in your environment variables.
 */
const SERVER_URL = process.env.RENDER_EXTERNAL_URL || 'https://onrender.com';

/**
 * Initializes all background cron jobs and keep-alive pingers
 */
function initCronTasks() {
  console.log('[CRON SYSTEM] Initializing background tasks...');

  // ============================================================
  // 1. Scheduled Background Job (Runs every 5 minutes)
  // Expression: */5 * * * *
  // ============================================================
  cron.schedule('*/5 * * * *', async () => {
    const timestamp = new Date().toISOString();
    console.log(`[CRON - 5 MIN] Task executed at: ${timestamp}`);

    try {
      // --------------------------------------------------------
      // PLACEHOLDER: Insert your custom backend logic below
      // Examples: Database cleanup, cache refresh, syncing data, etc.
      // --------------------------------------------------------

      // Example:
      // await performDatabaseSync();

      console.log('[CRON - 5 MIN] Custom logic executed successfully.');
    } catch (error) {
      console.error('[CRON - 5 MIN ERROR] Failed to run task:', error.message);
    }
  }, {
    scheduled: true,
    timezone: 'UTC' // Adjust timezone if needed (e.g., "Asia/Kolkata")
  });

  // ============================================================
  // 2. Render Keep-Alive Self-Ping Mechanism (Every 10 minutes)
  // Interval: 10 minutes = 10 * 60 * 1000 ms = 600,000 ms
  // ============================================================
  const PING_INTERVAL_MS = 10 * 60 * 1000;

  setInterval(async () => {
    try {
      const response = await fetch(SERVER_URL);
      console.log(`[KEEP-ALIVE] Self-ping to ${SERVER_URL} - Status: ${response.status} (${new Date().toLocaleTimeString()})`);
    } catch (error) {
      console.warn(`[KEEP-ALIVE ERROR] Could not self-ping ${SERVER_URL}:`, error.message);
    }
  }, PING_INTERVAL_MS);

  console.log(`[KEEP-ALIVE] Pinger active for ${SERVER_URL} every 10 minutes.`);
}

module.exports = { initCronTasks };
