const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides detailed information about the user."),
    async execute(interaction) {
        const user = interaction.user; // The user who ran the command
        const member = interaction.member; // The guild member object

        // Create an embed for a better visual representation
        const userEmbed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("User Information")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: "Username", value: `${user.username}`, inline: true },
                { name: "Discriminator", value: `#${user.discriminator}`, inline: true },
                { name: "ID", value: `${user.id}`, inline: false },
                { name: "Joined Server On", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
                { name: "Account Created On", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false }
            )
            .setFooter({ text: `Requested by ${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed
        await interaction.reply({ embeds: [userEmbed] });
    },
};
