const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const pats = require('./pats.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Give someone a pat on the head')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Select your partner')
            .setRequired(false)
        ),
async execute(interaction) {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    const author = interaction.user;
    const randomIndex = Math.floor(Math.random() * pats.length);

    const { image: patsImage, number: patsNumber } = pats[randomIndex];

    const patEmbed = new EmbedBuilder()
        .setColor('#4a54e7')
        .setImage(patsImage)

    let resultEmbed;

    if (targetUser.id === author.id) {
        resultEmbed = patEmbed
            .setAuthor({ name: `You okay ${author.username}? Are you seriously THIS lonely?`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    } else if (targetUser.id === interaction.client.user.id) {
        resultEmbed = patEmbed
            .setAuthor({ name: `...${author.username}? Fine but don't get any funny ideas!`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${author.username} patted ${interaction.client.user.username} gently` })
    } else if (author.id === "575921413190451204" && targetUser.id === "303410762213490689") {
        resultEmbed = patEmbed
            .setAuthor({ name: `${author.username} is patting ${targetUser.username} gently`, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `"Get some rest now Little One" Dad patted his Baby gently` })
    } else {
        resultEmbed = patEmbed
        .setAuthor({ name: `${author.username} gave ${targetUser.username} a pat!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    }

    await interaction.reply({ embeds: [resultEmbed] });
}
}