const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Assign a role to a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to assign the role to')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to assign')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({ content: "I don't have permission to manage roles.", ephemeral: true });
        }

        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: "I can't assign this role because it is higher than my highest role.", ephemeral: true });
        }

        if (member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${targetUser.username} already has the ${role.name} role.`, ephemeral: true });
        }

        try {
            await member.roles.add(role);
            await interaction.reply({ content: `Successfully assigned the ${role.name} role to ${targetUser.username}.` });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error while assigning the role.", ephemeral: true });
        }
    },
};