const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const catgirls = require('./catgirls.json'); // Move data to a separate JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cg')
        .setDescription('Summon a cute catgirl'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * catgirls.length);
            const { name: catgirlName, image: catgirlImage, number: catgirlNumber } = catgirls[randomIndex];

            const catgirlEmbed = new EmbedBuilder()
                .setImage(catgirlImage)
                .setURL(interaction.user.displayAvatarURL())
                .setAuthor({ name: `${interaction.user.username} found a catgirl`, iconURL: interaction.user.displayAvatarURL() })
                .setFooter({ text: `Your mini catgirl stamp\n${catgirlNumber}`, iconURL: catgirlImage })
                .setColor('#D31AD3');

            interaction.reply({ embeds: [catgirlEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};