const { Events } = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(charlotte) {
        console.log(`Events read ${charlotte.user.tag}`);
    }
}