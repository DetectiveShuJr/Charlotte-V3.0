const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and disconnect the bot from the voice channel.'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (!connection) {
            return interaction.reply({
                content: 'I am not connected to a voice channel!',
                ephemeral: true,
            });
        }

        connection.destroy(); // Disconnect from the voice channel
        await interaction.reply('🛑 Stopped the music and left the voice channel.');
    },
};