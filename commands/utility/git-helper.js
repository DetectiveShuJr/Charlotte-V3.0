const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('git-helper')
        .setDescription('Little reminder for myself of how to import commands to Heroku'),
    async execute(interaction) {
        const allowedUserId = '345261532982280194'; // Replace with the allowed user ID

        // Check if the user is allowed to use the command
        if (interaction.user.id !== allowedUserId) {
            return interaction.reply({
                content: `Sorry ${interaction.user}, you don't have permission to use this command. It's a GitHub command helper for <@${allowedUserId}>.`,
                ephemeral: true, // Only visible to the user
            });
        }

        // Ensure the command is executed in a channel
        if (!interaction.channel) {
            return interaction.reply({
                content: 'This command can only be used in a server channel, not in DMs.',
                ephemeral: true,
            });
        }

        // Ask the user what they need help with
        await interaction.reply({
            content: "What do you need help with, dad? (e.g., 'Saving all new changes to GitHub' or 'How do I hide files from GitHub?')",
            ephemeral: true, // Only visible to the user
        });

        try {
            const filter = i => i.author.id === interaction.user.id;
            const collected = await interaction.channel.awaitMessages({
                filter,
                max: 1,
                time: 15000,
                errors: ['time'],
            });

            const response = collected.first().content.toLowerCase();

            if (response.includes('saving all new changes to github')) {
                await interaction.followUp({
                    content: `To save all your changes:
1. Use \`git add .\` to stage all changes.
2. Use \`git commit -m "your message"\` to commit them.
3. Finally, use \`git push --set-upstream origin master\` to push them to GitHub.`,
                    ephemeral: true,
                });
            } else if (response.includes('how do i hide files from github')) {
                await interaction.followUp({
                    content: 'To hide files from GitHub, add their names to the `.gitignore` file. GitHub will ensure they are not tracked.',
                    ephemeral: true,
                });
            } else {
                await interaction.followUp({
                    content: "I'm not sure how to help with that. Please try asking something else.",
                    ephemeral: true,
                });
            }
        } catch (error) {
            await interaction.followUp({
                content: 'You took too long to respond. Please try again.',
                ephemeral: true,
            });
        }
    },
};