const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Start a fun fight with someone!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to fight with')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to self if no target is provided
        const author = interaction.user;

        // Array of fight GIFs
        const fightGifs = [
            'https://i.ibb.co/rm6m2gV/1-4.gif',
            'https://i.ibb.co/rcrXc21/2-3.gif',
            'https://i.ibb.co/9p5z2Wp/3-4.gif',
            'https://i.ibb.co/Rh5vHPf/4-2.gif',
            'https://i.ibb.co/cT3Fwck/5-2.gif',
            'https://i.ibb.co/TTr9jM3/6-2.gif',
            'https://i.ibb.co/N150vJr/7-2.gif',
            'https://i.ibb.co/2Syq7wd/8-2.gif',
            'https://i.ibb.co/gRY3WxF/9-2.gif',
            'https://i.ibb.co/cXf1yxy/10-2.gif',
            'https://i.ibb.co/XVnfb9d/11-2.gif',
        ];

        // Randomly select a fight GIF
        const randomGif = fightGifs[Math.floor(Math.random() * fightGifs.length)];

        // Create the embed
        const fightEmbed = new EmbedBuilder()
            .setColor('#FF5733') // Use a valid hexadecimal color code
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            fightEmbed.setAuthor({
                name: `${author.username} is fighting themselves!`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
            fightEmbed.setFooter({
                text: 'Why are you hitting yourself?',
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        } else {
            fightEmbed.setAuthor({
                name: `${author.username} is fighting ${targetUser.username}!`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
            fightEmbed.setFooter({
                text: 'Let the battle begin!',
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [fightEmbed] });
    },
};