<<<<<<< HEAD

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const valkyries = require('./cute.json'); // Move data to a separate JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loli')
        .setDescription('A spawn command'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * valkyries.length);
            const { name: loliName, image: loliImage, number: loliNumber } = valkyries[randomIndex];

            const loliEmbed = new EmbedBuilder()
                .setImage(loliImage)
                .setURL(interaction.user.displayAvatarURL())
                .setAuthor({ name: `${interaction.user.username} found ${loliName}`, iconURL: interaction.user.displayAvatarURL()})
                .setFooter({ text: `Your mini loli stamp\n${loliNumber}`, iconURL: loliImage })
                .setColor('#cef1ff');

            interaction.reply({ embeds: [loliEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
=======

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const valkyries = require('./cute.json'); // Move data to a separate JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loli')
        .setDescription('A spawn command'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * valkyries.length);
            const { name: loliName, image: loliImage, number: loliNumber } = valkyries[randomIndex];

            const loliEmbed = new EmbedBuilder()
                .setImage(loliImage)
                .setURL(interaction.user.displayAvatarURL())
                .setAuthor({ name: `${interaction.user.username} found ${loliName}`, iconURL: interaction.user.displayAvatarURL()})
                .setFooter({ text: `Your mini loli stamp\n${loliNumber}`, iconURL: loliImage })
                .setColor('#cef1ff');

            interaction.reply({ embeds: [loliEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};