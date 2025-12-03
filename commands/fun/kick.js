<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick someone with a fun GIF!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick (leave blank to kick yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of kick GIFs
        const kickGifs = [
            'https://i.ibb.co/hKF4fRS/1-1.gif',
            'https://i.ibb.co/mJ0ddGM/2-1.gif',
            'https://i.ibb.co/PNx2qP9/3-3.gif',
            'https://i.ibb.co/F7T7yfx/4-1.gif',
            'https://i.ibb.co/jz9m3C5/5-1.gif',
            'https://i.ibb.co/H24q4V3/6-1.gif',
            'https://i.ibb.co/6B31FB4/7-1.gif',
            'https://i.ibb.co/5cmtpvt/8-1.gif',
            'https://i.ibb.co/Vgwps7d/10-1.gif',
            'https://i.ibb.co/s1sjXWp/11-1.gif',
        ];

        // Randomly select a kick GIF
        const randomGif = kickGifs[Math.floor(Math.random() * kickGifs.length)];

        // Create the embed
        const kickEmbed = new EmbedBuilder()
            .setColor('#E0FBFF')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            kickEmbed
                .setAuthor({ name: `${author.username} somehow kicked themselves! Is that even possible?`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} just kicked themselves. Ouch!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === interaction.client.user.id) {
            kickEmbed
                .setAuthor({ name: `Nice try, ${author.username}, but you can't kick me!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `Attempted kick rejected!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            kickEmbed
                .setAuthor({ name: `${author.username} kicked ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} just kicked ${targetUser.username}. Hope they're okay!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [kickEmbed] });
    },
=======
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick someone with a fun GIF!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick (leave blank to kick yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of kick GIFs
        const kickGifs = [
            'https://i.ibb.co/hKF4fRS/1-1.gif',
            'https://i.ibb.co/mJ0ddGM/2-1.gif',
            'https://i.ibb.co/PNx2qP9/3-3.gif',
            'https://i.ibb.co/F7T7yfx/4-1.gif',
            'https://i.ibb.co/jz9m3C5/5-1.gif',
            'https://i.ibb.co/H24q4V3/6-1.gif',
            'https://i.ibb.co/6B31FB4/7-1.gif',
            'https://i.ibb.co/5cmtpvt/8-1.gif',
            'https://i.ibb.co/Vgwps7d/10-1.gif',
            'https://i.ibb.co/s1sjXWp/11-1.gif',
        ];

        // Randomly select a kick GIF
        const randomGif = kickGifs[Math.floor(Math.random() * kickGifs.length)];

        // Create the embed
        const kickEmbed = new EmbedBuilder()
            .setColor('#E0FBFF')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            kickEmbed
                .setAuthor({ name: `${author.username} somehow kicked themselves! Is that even possible?`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} just kicked themselves. Ouch!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === interaction.client.user.id) {
            kickEmbed
                .setAuthor({ name: `Nice try, ${author.username}, but you can't kick me!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `Attempted kick rejected!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            kickEmbed
                .setAuthor({ name: `${author.username} kicked ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} just kicked ${targetUser.username}. Hope they're okay!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [kickEmbed] });
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};