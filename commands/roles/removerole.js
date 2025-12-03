<<<<<<< HEAD
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from yourself or another user.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to remove')
                .setRequired(true) // Required option comes first
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to remove the role from (leave blank to remove from yourself)')
                .setRequired(false) // Non-required option comes after
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles), // Restrict to users with Manage Roles permission
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(targetUser.id);

        // Check if the bot has permission to manage roles
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({ content: "I don't have permission to manage roles.", ephemeral: true });
        }

        // Check if the role is manageable by the bot
        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: "I can't remove this role because it is higher than my highest role.", ephemeral: true });
        }

        // Check if the member has the role
        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${targetUser.username} does not have the ${role.name} role.`, ephemeral: true });
        }

        try {
            // Remove the role from the member
            await member.roles.remove(role);
            await interaction.reply({ content: `Successfully removed the ${role.name} role from ${targetUser.username}.` });

            // Optionally, send a DM to the user
            if (targetUser.id !== interaction.user.id) {
                try {
                    await targetUser.send(`The ${role.name} role has been removed from you in ${interaction.guild.name}.`);
                } catch (error) {
                    console.log(`Could not send a DM to ${targetUser.username}. Their DMs might be closed.`);
                }
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error while removing the role.", ephemeral: true });
        }
    },
=======
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from yourself or another user.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to remove')
                .setRequired(true) // Required option comes first
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to remove the role from (leave blank to remove from yourself)')
                .setRequired(false) // Non-required option comes after
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles), // Restrict to users with Manage Roles permission
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(targetUser.id);

        // Check if the bot has permission to manage roles
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({ content: "I don't have permission to manage roles.", ephemeral: true });
        }

        // Check if the role is manageable by the bot
        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({ content: "I can't remove this role because it is higher than my highest role.", ephemeral: true });
        }

        // Check if the member has the role
        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${targetUser.username} does not have the ${role.name} role.`, ephemeral: true });
        }

        try {
            // Remove the role from the member
            await member.roles.remove(role);
            await interaction.reply({ content: `Successfully removed the ${role.name} role from ${targetUser.username}.` });

            // Optionally, send a DM to the user
            if (targetUser.id !== interaction.user.id) {
                try {
                    await targetUser.send(`The ${role.name} role has been removed from you in ${interaction.guild.name}.`);
                } catch (error) {
                    console.log(`Could not send a DM to ${targetUser.username}. Their DMs might be closed.`);
                }
            }
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "There was an error while removing the role.", ephemeral: true });
        }
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};