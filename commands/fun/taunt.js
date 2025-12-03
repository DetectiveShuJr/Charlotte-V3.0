const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('taunt')
        .setDescription('Taunt someone with a fun GIF!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to taunt (leave blank to taunt everyone)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target'); // Get the target user (if any)
        const author = interaction.user;

        // Array of taunt GIFs
        const tauntGifs = [
            'https://imgur.com/UUocFxH.gif',
            'https://imgur.com/5i9Y8GD.gif',
            'https://imgur.com/LFcOsRv.gif',
            'https://imgur.com/jDFDnGN.gif',
            'https://imgur.com/EhC5cOF.gif',
        ];

        // Randomly select a taunt GIF
        const randomGif = tauntGifs[Math.floor(Math.random() * tauntGifs.length)];

        // Create the embed
        const tauntEmbed = new EmbedBuilder()
            .setColor('#CACC36')
            .setImage(randomGif);

        // Handle different scenarios
        if (!targetUser) {
            // No target specified, taunt everyone
            tauntEmbed.setAuthor({
                name: `Hey! ${author.username} is taunting everyone! Let's get them!`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        } else if (targetUser.id === author.id) {
            // User is taunting themselves
            tauntEmbed.setAuthor({
                name: `Hey! ${author.username} is taunting themselves. Are they okay?`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        } else if (targetUser.id === '663616911992422400') {
            // Special case for a specific user (e.g., Mom)
            tauntEmbed.setAuthor({
                name: `Hey! What did I do wrong, ${author.username}?!`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        } else {
            // Taunting another user
            tauntEmbed.setAuthor({
                name: `I wouldn't suggest taunting ${targetUser.username}, but go for it!`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [tauntEmbed] });
    },
};