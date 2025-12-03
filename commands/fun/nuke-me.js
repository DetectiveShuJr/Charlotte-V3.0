const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke-me')
        .setDescription('Send a nuke to yourself with a fun GIF!'),
    async execute(interaction) {
        // Randomly select a nuke GIF
        const nukeGifs = [
            'https://i.ibb.co/YP2CFxs/1-6.gif', // Add more GIFs here if needed
        ];
        const randomGif = nukeGifs[Math.floor(Math.random() * nukeGifs.length)];

        // Create the embed
        const nukeEmbed = new EmbedBuilder()
            .setColor('#CACC36')
            .setAuthor({
                name: `***NUKE PHASE ACTIVATED, ALL SYSTEMS GO***`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(
                `Welp, due to a loss of intelligence, ${interaction.user.username} sent a nuke towards themselves. Good job everyone!`
            )
            .setImage(randomGif)
            .setFooter({
                text: `${interaction.user.username} just killed themselves`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        // Reply with the embed
        await interaction.reply({ embeds: [nukeEmbed] });
    },
};