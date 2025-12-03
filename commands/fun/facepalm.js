const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('facepalm')
        .setDescription('Express your frustration with a facepalm GIF.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user whose logic you are tired of.')
                .setRequired(false)
        ),
    async execute(interaction) {
        // Defer the reply to avoid interaction timeout
        await interaction.deferReply();

        // Get the target user or default to the command user
        const targetUser = interaction.options.getUser('target') || interaction.user;

        // Randomly select a facepalm GIF
        const numberOfGifs = 15; // Total number of GIFs in the folder
        const randomGifNumber = Math.floor(Math.random() * numberOfGifs) + 1;
        const gifPath = path.join(__dirname, '..', '..', 'facepalm', `${randomGifNumber}.gif`);

        // Create the embed
        const facepalmEmbed = new EmbedBuilder()
            .setColor('#FF5733')
            .setTitle('Facepalm Moment')
            .setDescription(
                targetUser.id === interaction.user.id
                    ? `${interaction.user} is tired of everything. Maybe it's time to take a break!`
                    : `${interaction.user} is tired of ${targetUser}'s logic. Try punching them instead!`
            )
            .setImage(`attachment://${randomGifNumber}.gif`)
            .setFooter({ text: 'Facepalm GIF', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed and attach the GIF
        await interaction.editReply({
            embeds: [facepalmEmbed],
            files: [{ attachment: gifPath, name: `${randomGifNumber}.gif` }],
        });
    },
};