<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user whose avatar you want to view.')
                .setRequired(false)
        ),
    async execute(interaction) {
        // Get the target user or default to the command user
        const targetUser = interaction.options.getUser('target') || interaction.user;

        // Create an embed to display the avatar
        const avatarEmbed = new EmbedBuilder()
            .setColor('#77ADFF')
            .setAuthor({ name: `${targetUser.username}'s Avatar`, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed
        await interaction.reply({ embeds: [avatarEmbed] });
    },
=======
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user whose avatar you want to view.')
                .setRequired(false)
        ),
    async execute(interaction) {
        // Get the target user or default to the command user
        const targetUser = interaction.options.getUser('target') || interaction.user;

        // Create an embed to display the avatar
        const avatarEmbed = new EmbedBuilder()
            .setColor('#77ADFF')
            .setAuthor({ name: `${targetUser.username}'s Avatar`, iconURL: targetUser.displayAvatarURL({ dynamic: true }) })
            .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        // Reply with the embed
        await interaction.reply({ embeds: [avatarEmbed] });
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};