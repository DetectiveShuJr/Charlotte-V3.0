const { SlashCommandBuilder, Client } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends Char\'s ping'),
    async execute(interaction, charlotte) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    },
};