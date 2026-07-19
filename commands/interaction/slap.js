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
    const randomIndex = Math.floort(Math.random() * slapGifs.length);
    const experience = Math.floor(Math.random() * 999);
    const { image: slapGifsImage, number: slapGifsNumber } = slapGifs[randomIndex];

    const slapEmbed = new EmbedBuilder()
        .setColor('#ae4ae7')
        .setImage(slapGifsImage)

    const kickCustomEmbed = new EmbedBuilder()
    .setImage('https://i.ibb.co/mJ0ddGM/2-1.gif')

    if (targetUser.id === author.id) {
        slapEmbed
            .setAuthor({ name: `You okay ${author.username}? Don't slap yourself!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${author.username} slapped themselves\n${slapGifsNumber}`, iconURL: author.displayerAvatarURL({ dynamic: true }) })
    } else if (targetUser.id === interaction.client.user.id) {
        kickCustomEmbed
            .setAuthor({ name: `How dare you ${author.username}?! Get outta here!!!`, iconURL: client.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${client.username} kicked ${author.username} out of the building\n'Screw you'`, iconURL: client.displayAvatarURL({ dynamic: true }) })
    } else {
        slapEmbed
            .setAuthor({ name: `${author.username} slapped the smirk right off ${targetUser.username}!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${targetUser.username} fainted! ${experience} exp for ${author.username}`})
    }

    await interaction.reply({ embeds: [slapEmbed, kickCustomEmbed] });
}
}