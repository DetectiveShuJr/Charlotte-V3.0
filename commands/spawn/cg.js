const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const catgirls = require('./catgirls.json'); // Load catgirl data from JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cg')
        .setDescription('Fun little gif command'),
    async execute(interaction) {
        try {
            // Validate catgirls array
            if (!Array.isArray(catgirls) || catgirls.length === 0) {
                throw new Error('Catgirl data is missing or invalid.');
            }

            // Select a random catgirl
            const randomIndex = Math.floor(Math.random() * catgirls.length);
            const { image: catgirlImage = '' } = catgirls[randomIndex];

            // Create an embed message
            const catgirlEmbed = new EmbedBuilder()
                .setColor('#D31AD3')
                .setAuthor({ name: `${interaction.user.username} found a catgirl`, iconURL: interaction.user.displayAvatarURL() })
                .setImage(catgirlImage)
                .setFooter({
                    text: 'Your mini catgirl stamp',
                    iconURL: catgirlImage
                });

            // Send the embed
            await interaction.reply({ embeds: [catgirlEmbed] });
        } catch (error) {
            console.error('Error in cg command:', error); // Log the error details
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    }
};