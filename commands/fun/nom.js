<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nom')
        .setDescription('Share a light snack with someone or enjoy it yourself!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to share a snack with (leave blank to snack alone)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of nom GIFs
        const nomGifs = [
            'https://cdn.discordapp.com/attachments/835480340364656652/835480385659076618/nom1.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/835480411529805834/nom2.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/835480428470468608/nom3.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836536404485079090/nom4.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836537541338333224/nom5.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836537833970991174/nom6.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538381658882068/nom7.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538654490230784/nom8.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538934577201212/nom9.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836545280231866368/nom10.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836545682814271518/nom11.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836546528269172756/nom12.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836559986888015952/nom13.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836577264610705424/senkoNom.gif',
        ];

        // Randomly select a nom GIF
        const randomGif = nomGifs[Math.floor(Math.random() * nomGifs.length)];

        // Create the embed
        const nomEmbed = new EmbedBuilder()
            .setColor('#0F52A3')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            nomEmbed
                .setAuthor({ name: `${author.username} decided to enjoy a light snack alone.`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Sometimes, snacks are best enjoyed alone!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            nomEmbed
                .setAuthor({ name: `${author.username} is sharing a light snack with ${targetUser.username}.`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Sharing is caring!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [nomEmbed] });
    },
=======
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nom')
        .setDescription('Share a light snack with someone or enjoy it yourself!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to share a snack with (leave blank to snack alone)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of nom GIFs
        const nomGifs = [
            'https://cdn.discordapp.com/attachments/835480340364656652/835480385659076618/nom1.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/835480411529805834/nom2.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/835480428470468608/nom3.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836536404485079090/nom4.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836537541338333224/nom5.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836537833970991174/nom6.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538381658882068/nom7.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538654490230784/nom8.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836538934577201212/nom9.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836545280231866368/nom10.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836545682814271518/nom11.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836546528269172756/nom12.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836559986888015952/nom13.gif',
            'https://cdn.discordapp.com/attachments/835480340364656652/836577264610705424/senkoNom.gif',
        ];

        // Randomly select a nom GIF
        const randomGif = nomGifs[Math.floor(Math.random() * nomGifs.length)];

        // Create the embed
        const nomEmbed = new EmbedBuilder()
            .setColor('#0F52A3')
            .setImage(randomGif);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            nomEmbed
                .setAuthor({ name: `${author.username} decided to enjoy a light snack alone.`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Sometimes, snacks are best enjoyed alone!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else {
            nomEmbed
                .setAuthor({ name: `${author.username} is sharing a light snack with ${targetUser.username}.`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Sharing is caring!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed
        await interaction.reply({ embeds: [nomEmbed] });
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};