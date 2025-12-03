<<<<<<< HEAD
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pf')
        .setDescription('Powers down Charlotte and Angel bots. (Restricted to specific users)'),
    async execute(interaction) {
        const allowedUsers = [
            '345261532982280194', // Dad
            '303410762213490689', // Mom
            '915711098685124619', // Angel
            '519206163498270740', // Charlotte
        ];

        // Check if the user is allowed to use the command
        if (!allowedUsers.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'Only Mom and Dad can use this command.',
                ephemeral: true, // Only visible to the user
            });
        }

        // Confirm shutdown
        await interaction.reply({
            content: 'Shutting down now...',
            ephemeral: true, // Only visible to the user
        });

        // Exit the process
        process.exit(0); // Exit the bot process
    },
=======
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pf')
        .setDescription('Powers down Charlotte and Angel bots. (Restricted to specific users)'),
    async execute(interaction) {
        const allowedUsers = [
            '345261532982280194', // Dad
            '303410762213490689', // Mom
            '915711098685124619', // Angel
            '519206163498270740', // Charlotte
        ];

        // Check if the user is allowed to use the command
        if (!allowedUsers.includes(interaction.user.id)) {
            return interaction.reply({
                content: 'Only Mom and Dad can use this command.',
                ephemeral: true, // Only visible to the user
            });
        }

        // Confirm shutdown
        await interaction.reply({
            content: 'Shutting down now...',
            ephemeral: true, // Only visible to the user
        });

        // Exit the process
        process.exit(0); // Exit the bot process
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};