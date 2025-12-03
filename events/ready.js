const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(charlotte) {
    console.log(`[${new Date().toLocaleString()}] ✅ Bot is online as ${charlotte.user.tag}`);

    // Optional: set a presence/status
    charlotte.user.setPresence({
      activities: [{ name: 'Char Mode: on...', type: 0 }],
      status: 'online',
    });
  },
};