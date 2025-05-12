const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Find out your IQ with a fun command!'),
    async execute(interaction) {
        // Generate a random IQ between 0 and 200
        const iq = Math.floor(Math.random() * 201);

        // Create a response message
        const response = iq === 0
            ? 'Your IQ is 0, you poor poor thing...'
            : `Your IQ is ${iq}`;

        // Reply to the interaction
        await interaction.reply(response);
    },
};