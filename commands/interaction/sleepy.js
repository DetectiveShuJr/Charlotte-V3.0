const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sleep = require('./sleep.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sleepy')
        .setDescription('Feeling sleepy? Take a nap')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Select your body pillow')
            .setRequired(false)
        ),
async execute(interaction) {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    const author = interaction.user;
    const randomIndex = Math.floor(Math.random() * sleep.length);
    const experience = Math.floor(Math.random() * 999);
    const { image: sleepImage, number: sleepNumber } = sleep[randomIndex];

    const sleepEmbed = new EmbedBuilder()
        .setColor('#ae4ae7')
        .setImage(sleepImage)

    let resultEmbed;

    if (targetUser.id === author.id) {
        resultEmbed = sleepEmbed
            .setAuthor({ name: `Feeling sleepy ${author.username}? You should lay down and nap`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    } else if (targetUser.id === interaction.client.user.id) {
        resultEmbed = sleepEmbed
            .setAuthor({ name: `Fine... I guess I'll nap with you ${author.username}`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
    } else {
        resultEmbed = sleepEmbed
            .setAuthor({ name: `${author.username} is sleepy, you should lay down with them ${targetUser.username}`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    }

    await interaction.reply({ embeds: [resultEmbed] });
}
}