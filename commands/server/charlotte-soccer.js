const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('charlotte-soccer')
        .setDescription('Kick a user out of the server with style!')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: "I can't find this user in the server.", ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: "I can't kick this user. They might have a higher role or special permissions.", ephemeral: true });
        }

        try {
            await member.kick('Kicked via Charlotte Soccer!');
            const kickEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Goal!')
                .setDescription(`${user.username} has been kicked out of the server! ⚽`)
                .setFooter({ text: `Kicked by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            await interaction.reply({ embeds: [kickEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error while trying to kick this user.", ephemeral: true });
        }
    },
};