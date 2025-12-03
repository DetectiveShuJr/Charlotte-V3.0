const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sm')
        .setDescription('Call out to Sailor Moon and see what happens!'),
    async execute(interaction) {
        // Array of Sailor Moon images/GIFs
        const sailorMoonImages = [
            'https://i.ibb.co/VxzFMZZ/SME.png',
            'https://i.ibb.co/JjqkZLM/sailor-screenshot.jpg',
            'https://i.ibb.co/pWgzbQZ/sailor-moon-icegif-4.gif',
            'https://i.ibb.co/VjYr2JW/sailor-moon-eternal-movie.png',
            'https://i.ibb.co/T0XLQQV/sailor-moon.jpg',
            'https://i.ibb.co/G2Kc3V1/sailor-moon-fanart-by-pinkytsu-de4hno1-fullview.jpg',
            'https://i.ibb.co/t3ypGk5/pjdt7qhxoks01.png',
            'https://i.ibb.co/VH676y5/image.jpg',
            'https://i.ibb.co/0Dvk43M/giphy.gif',
            'https://i.ibb.co/mFMzLr8/20210705-115315.gif',
            'https://i.ibb.co/3TDZHcM/e92a42f905df4651cb8455e457140557.jpg',
            'https://i.ibb.co/wS8n95F/e4c7dc9903250a52cb9d1ac7c3299263e466c578r1-640-459-hq.gif',
            'https://i.ibb.co/VgFxw4G/200w.gif',
            'https://i.ibb.co/DW5kVhz/20210705-115222.gif',
            'https://i.ibb.co/dJ4sBqW/image0.gif',
        ];

        // Randomly select an image/GIF
        const randomImage = sailorMoonImages[Math.floor(Math.random() * sailorMoonImages.length)];

        // Create the embed
        const sailorMoonEmbed = new EmbedBuilder()
            .setColor('#cef1ff')
            .setAuthor({
                name: `${interaction.user.username} called out to Sailor Moon!`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setImage(randomImage)
            .setFooter({ text: 'Sailor Moon is on the hunt now!' });

        // Reply with the embed
        await interaction.reply({ embeds: [sailorMoonEmbed] });
    },
};