const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const valkyries = require('./valkyries.json'); // Move data to a separate JSON file

module.exports = {
    data: new SlashCommandBuilder()
        .setName('honkai')
        .setDescription('A spawn command'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * valkyries.length);
            const { name: valkyrieName, image: valkyrieImage, number: valkyrieNumber, color: valkyrieColor } = valkyries[randomIndex];

            const valkyrieEmbed = new EmbedBuilder()
                .setImage(valkyrieImage)
                .setURL(interaction.user.displayAvatarURL())
                .setAuthor({ name: `${interaction.user.username} drew ${valkyrieName}`, iconURL: interaction.user.displayAvatarURL() })
                .setFooter({ text: `Here\'s your mini Valkyrie stamp\n${valkyrieNumber}`, iconURL: valkyrieImage })
                .setColor(valkyrieColor || '#ffc354'); // Default color if not specified

            interaction.reply({ embeds: [valkyrieEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};