
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cute = require('./cute.json'); // Move data to a separate JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loli')
        .setDescription('A spawn command'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * cute.length);
            const { name: loliName, image: loliImage, number: loliNumber } = cute[randomIndex];

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
};