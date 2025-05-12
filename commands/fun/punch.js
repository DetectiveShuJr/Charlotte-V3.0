const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('punch')
        .setDescription('Throw a punch at someone with a fun GIF!')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want to punch')
                .setRequired(true)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target'); // Get the target user
        const author = interaction.user;

        // Array of punch GIFs
        const punchGifs = [
            'https://imgur.com/27J2BOb',
            'https://imgur.com/Y9dKW1U',
            'https://imgur.com/qkwrGV1',
            'https://imgur.com/xWBXRm3',
            'https://imgur.com/ShLN211',
            'https://imgur.com/nnYEjF1',
            'https://imgur.com/ywINotQ',
            'https://imgur.com/aaJ0N3L',
            'https://imgur.com/f3j1kwK',
            'https://imgur.com/VsG7oSu',
            'https://imgur.com/9L4d1lg',
            'https://imgur.com/lq6wOjP',
            'https://imgur.com/jSVUeb9',
            'https://imgur.com/yBO6wdt',
            'https://imgur.com/7HIeZtQ',
            'https://imgur.com/Ylqltlz',
            'https://imgur.com/UOy0U5R',
            'https://imgur.com/tzyP8pj',
            'https://imgur.com/nFe4SEf',
            'https://imgur.com/4c2QSGd',
            'https://imgur.com/S0CE73p',
            'https://imgur.com/guLsMaH',
            'https://imgur.com/obbFyJW',
            'https://imgur.com/tJ4MXJ5',
            'https://imgur.com/RAngs7q',
            'https://imgur.com/VgSamo6',
            'https://imgur.com/my2KUjj',
        ];

        // Randomly select a punch GIF
        const randomGif = punchGifs[Math.floor(Math.random() * punchGifs.length)];

        // Handle different scenarios
        if (targetUser.id === author.id) {
            // User punches themselves
            const punchEmbed = new EmbedBuilder()
                .setColor('#ff2e2e')
                .setAuthor({ name: `Why are you hitting yourself, ${author.username}?` })
                .setImage(randomGif)
                .setFooter({
                    text: `${author.username} just punched themselves...`,
                    iconURL: author.displayAvatarURL({ dynamic: true }),
                });

            return interaction.reply({ embeds: [punchEmbed] });
        }

        if (targetUser.id === interaction.client.user.id) {
            // User tries to punch the bot
            const punchEmbed = new EmbedBuilder()
                .setColor('#ff2e2e')
                .setAuthor({ name: `Nice try, ${author.username}, but you can't punch me!` })
                .setImage(randomGif)
                .setFooter({
                    text: `Better luck next time, ${author.username}!`,
                    iconURL: author.displayAvatarURL({ dynamic: true }),
                });

            return interaction.reply({ embeds: [punchEmbed] });
        }

        // User punches someone else
        const punchEmbed = new EmbedBuilder()
            .setColor('#ff2e2e')
            .setAuthor({ name: `${author.username} just threw a punch at ${targetUser.username}!` })
            .setImage(randomGif)
            .setFooter({
                text: `${author.username} punched ${targetUser.username}`,
                iconURL: author.displayAvatarURL({ dynamic: true }),
            });

        return interaction.reply({ embeds: [punchEmbed] });
    },
};