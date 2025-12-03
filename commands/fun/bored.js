<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Feeling bored? Get a random relaxing GIF!'),
    async execute(interaction) {
        // Array of GIF URLs
        const boredImages = [
            'https://i.ibb.co/S5D9t5d/1.gif',
            'https://i.ibb.co/T1vWbTt/2.gif',
            'https://i.ibb.co/yPbxpM4/3-1.gif',
            'https://i.ibb.co/g4TJXSM/4.gif',
            'https://i.ibb.co/yWrNj8f/5.gif',
            'https://i.ibb.co/2WwKQ5Z/6.gif',
            'https://i.ibb.co/z6GWGG8/7.gif',
            'https://i.ibb.co/0DhBnBx/8.gif',
            'https://i.ibb.co/y44WSzj/9-1.gif',
            'https://i.ibb.co/5Gtdq0R/10.gif',
            'https://i.ibb.co/8mbhk4B/11.gif',
            'https://i.ibb.co/27qckvp/12-1.gif',
            'https://i.ibb.co/D1FQpBy/13.gif',
            'https://i.ibb.co/CsFdMNG/14.gif',
        ];

        // Randomly select a GIF
        const randomImage = boredImages[Math.floor(Math.random() * boredImages.length)];

        // Create an embed
        const boredEmbed = new EmbedBuilder()
            .setColor('#FFA272')
            .setAuthor({ name: 'Feeling bored? Take a break and relax!' })
            .setImage(randomImage)
            .setFooter({ text: `${interaction.user.username} is bored`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed
        await interaction.reply({ embeds: [boredEmbed] });
    },
=======
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bored')
        .setDescription('Feeling bored? Get a random relaxing GIF!'),
    async execute(interaction) {
        // Array of GIF URLs
        const boredImages = [
            'https://i.ibb.co/S5D9t5d/1.gif',
            'https://i.ibb.co/T1vWbTt/2.gif',
            'https://i.ibb.co/yPbxpM4/3-1.gif',
            'https://i.ibb.co/g4TJXSM/4.gif',
            'https://i.ibb.co/yWrNj8f/5.gif',
            'https://i.ibb.co/2WwKQ5Z/6.gif',
            'https://i.ibb.co/z6GWGG8/7.gif',
            'https://i.ibb.co/0DhBnBx/8.gif',
            'https://i.ibb.co/y44WSzj/9-1.gif',
            'https://i.ibb.co/5Gtdq0R/10.gif',
            'https://i.ibb.co/8mbhk4B/11.gif',
            'https://i.ibb.co/27qckvp/12-1.gif',
            'https://i.ibb.co/D1FQpBy/13.gif',
            'https://i.ibb.co/CsFdMNG/14.gif',
        ];

        // Randomly select a GIF
        const randomImage = boredImages[Math.floor(Math.random() * boredImages.length)];

        // Create an embed
        const boredEmbed = new EmbedBuilder()
            .setColor('#FFA272')
            .setAuthor({ name: 'Feeling bored? Take a break and relax!' })
            .setImage(randomImage)
            .setFooter({ text: `${interaction.user.username} is bored`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed
        await interaction.reply({ embeds: [boredEmbed] });
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};