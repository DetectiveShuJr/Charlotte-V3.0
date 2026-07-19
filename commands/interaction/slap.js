const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const slapGifs = require('./slapGifs.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Ever want to slap someone? Now you can!')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('Select the victim')
            .setRequired(false)
        ),
async execute(interaction) {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    const author = interaction.user;
    const randomIndex = Math.floor(Math.random() * slapGifs.length);
    const experience = Math.floor(Math.random() * 999);
    const { image: slapGifsImage, number: slapGifsNumber } = slapGifs[randomIndex];

    const slapEmbed = new EmbedBuilder()
        .setColor('#ae4ae7')
        .setImage(slapGifsImage)

    const kickCustomEmbed = new EmbedBuilder()
    .setImage('https://i.ibb.co/mJ0ddGM/2-1.gif')

    let resultEmbed;

    if (targetUser.id === author.id) {
        resultEmbed = slapEmbed
            .setAuthor({ name: `You okay ${author.username}? Don't slap yourself!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    } else if (targetUser.id === interaction.client.user.id) {
        resultEmbed = kickCustomEmbed
            .setAuthor({ name: `How dare you ${author.username}?! Get outta here!!!`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${interaction.client.user.username} kicked ${author.username} out of the building\nScrew you`, iconURL: 'https://i.imgur.com/gwcih50.png' })
    } else {
        resultEmbed = slapEmbed
            .setAuthor({ name: `${author.username} slapped the smirk right off ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${targetUser.username} fainted! ${experience} exp for ${author.username}!\n${slapGifsNumber}`, iconURL: author.displayAvatarURL({ dynamic: true }) })
    }

    await interaction.reply({ embeds: [resultEmbed] });
}
}