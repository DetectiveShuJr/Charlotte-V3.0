<<<<<<< HEAD
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload-commands')
        .setDescription('Reload all commands dynamically.'),
    async execute(interaction) {
        try {
            loadCommands();
            return interaction.reply({
                content: 'All commands have been reloaded successfully!',
                ephemeral: true,
            });
        } catch (error) {
            console.error('Error reloading commands:', error);
            return interaction.reply({
                content: 'There was an error reloading the commands. Check the logs for details.',
                ephemeral: true,
            });
        }
    },
=======
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload-commands')
        .setDescription('Reload all commands dynamically.'),
    async execute(interaction) {
        try {
            loadCommands();
            return interaction.reply({
                content: 'All commands have been reloaded successfully!',
                ephemeral: true,
            });
        } catch (error) {
            console.error('Error reloading commands:', error);
            return interaction.reply({
                content: 'There was an error reloading the commands. Check the logs for details.',
                ephemeral: true,
            });
        }
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};