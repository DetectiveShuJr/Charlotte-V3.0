const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mad')
        .setDescription('Express your anger at someone or yourself with a fun GIF!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you are mad at (leave blank to express anger at yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of anger GIFs
        const angerGifs = [
            './deadly/1.gif',
            './deadly/2.gif',
            './deadly/3.gif',
            './deadly/4.gif',
            './deadly/5.gif',
            './deadly/6.gif',
            './deadly/7.gif',
            './deadly/8.gif',
            './deadly/9.gif',
            './deadly/10.gif',
            './deadly/11.gif',
            './deadly/12.gif',
            './deadly/13.gif',
        ];

        // Randomly select a GIF
        const randomGif = angerGifs[Math.floor(Math.random() * angerGifs.length)];

        // Create the embed
        const madEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setImage(`attachment://${randomGif.split('/').pop()}`); // Attach the GIF dynamically

        // Handle different scenarios
        if (targetUser.id === author.id) {
            madEmbed
                .setAuthor({ name: `${author.username} looks angry, I wonder why...`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Take a deep breath!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === interaction.client.user.id) {
            madEmbed
                .setAuthor({ name: `What did I do wrong, ${author.username}?!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'I hope I didn’t upset you!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            madEmbed
                .setAuthor({ name: `${author.username} seems mad at ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Uh-oh, someone’s in trouble!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed and attach the GIF
        await interaction.reply({
            embeds: [madEmbed],
            files: [{ attachment: randomGif, name: randomGif.split('/').pop() }],
        });
    },
};