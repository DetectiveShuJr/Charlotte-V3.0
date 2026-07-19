const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Kisses = require('./kisses.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Probably mom\'s favorite command')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Select your partner')
            .setRequired(false)
        ),
async execute(interaction) {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    const author = interaction.user;
    const randomIndex = Math.floor(Math.random() * Kisses.length);
    const experience = Math.floor(Math.random() * 999);
    const { image: KissesImage, number: KissesNumber } = Kisses[randomIndex];

    const kissEmbed = new EmbedBuilder()
        .setColor('#ae4ae7')
        .setImage(KissesImage)

    const kickCustomEmbed = new EmbedBuilder()
    .setImage('https://i.ibb.co/mJ0ddGM/2-1.gif')

    let resultEmbed;

    if (targetUser.id === author.id) {
        resultEmbed = kissEmbed
            .setAuthor({ name: `You okay ${author.username}? Are you seriously THIS lonely?`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    } else if (targetUser.id === interaction.client.user.id) {
        resultEmbed = kickCustomEmbed
            .setAuthor({ name: `How dare you ${author.username}?! Get outta here!!!`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${interaction.client.user.username} kicked ${author.username} out of the building\nScrew you`, iconURL: 'https://i.imgur.com/gwcih50.png' })
    } else {
        resultEmbed = kissEmbed
            .setAuthor({ name: `${author.username} gave ${targetUser.username} a kiss!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    }

    await interaction.reply({ embeds: [resultEmbed] });
}
}