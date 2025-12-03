<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Launch a nuke at yourself or another user!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to nuke (leave blank to nuke yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of nuke GIFs
        const nukeGifs = [
            'https://i.ibb.co/gSfkdPR/1.gif',
            'https://i.ibb.co/DWbfpRR/2.gif',
            'https://i.ibb.co/PmNDLB6/3.gif',
            'https://i.ibb.co/CVh231k/4.gif',
            'https://i.ibb.co/7g3vc4p/5.gif',
            'https://i.ibb.co/S317bbG/6.gif',
            'https://i.ibb.co/RDwwdCw/7.gif',
            'https://i.ibb.co/5x3Cjf8/8.gif',
            'https://i.ibb.co/yhBprLL/9.gif',
            'https://i.ibb.co/Z2S8BP1/10.gif',
            'https://i.ibb.co/Tr18nYt/11.gif',
            'https://i.ibb.co/DtgrnWd/12.gif',
            'https://i.ibb.co/19DDpky/13.gif',
        ];

        // Randomly select a nuke GIF
        const randomGif = nukeGifs[Math.floor(Math.random() * nukeGifs.length)];

        // Create the embed
        const nukeEmbed = new EmbedBuilder()
            .setColor('#CACC36')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            nukeEmbed
                .setAuthor({ name: `${author.username} just nuked themselves!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} launched a nuke at themselves. RIP!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === interaction.client.user.id) {
            nukeEmbed
                .setAuthor({ name: `Nice try, ${author.username}, but I can't be nuked!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `Attempted nuke rejected!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            nukeEmbed
                .setAuthor({ name: `${author.username} launched a nuke at ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} nuked ${targetUser.username}. RIP!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [nukeEmbed] });
    },
=======
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Launch a nuke at yourself or another user!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to nuke (leave blank to nuke yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of nuke GIFs
        const nukeGifs = [
            'https://i.ibb.co/gSfkdPR/1.gif',
            'https://i.ibb.co/DWbfpRR/2.gif',
            'https://i.ibb.co/PmNDLB6/3.gif',
            'https://i.ibb.co/CVh231k/4.gif',
            'https://i.ibb.co/7g3vc4p/5.gif',
            'https://i.ibb.co/S317bbG/6.gif',
            'https://i.ibb.co/RDwwdCw/7.gif',
            'https://i.ibb.co/5x3Cjf8/8.gif',
            'https://i.ibb.co/yhBprLL/9.gif',
            'https://i.ibb.co/Z2S8BP1/10.gif',
            'https://i.ibb.co/Tr18nYt/11.gif',
            'https://i.ibb.co/DtgrnWd/12.gif',
            'https://i.ibb.co/19DDpky/13.gif',
        ];

        // Randomly select a nuke GIF
        const randomGif = nukeGifs[Math.floor(Math.random() * nukeGifs.length)];

        // Create the embed
        const nukeEmbed = new EmbedBuilder()
            .setColor('#CACC36')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            nukeEmbed
                .setAuthor({ name: `${author.username} just nuked themselves!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} launched a nuke at themselves. RIP!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === interaction.client.user.id) {
            nukeEmbed
                .setAuthor({ name: `Nice try, ${author.username}, but I can't be nuked!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `Attempted nuke rejected!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            nukeEmbed
                .setAuthor({ name: `${author.username} launched a nuke at ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} nuked ${targetUser.username}. RIP!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [nukeEmbed] });
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};