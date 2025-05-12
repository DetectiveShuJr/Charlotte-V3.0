const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of all commands or detailed information about a specific command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The name of the command to get detailed information about')
                .setRequired(false)
        ),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');
        const commands = interaction.client.commands; // Access the bot's command collection

        // If a specific command is requested
        if (commandName) {
            const command = commands.get(commandName);

            if (!command) {
                return interaction.reply({
                    content: `I couldn't find a command named \`${commandName}\`.`,
                    ephemeral: true,
                });
            }

            // Create an embed for the specific command
            const commandEmbed = new EmbedBuilder()
                .setColor('#00FFF3')
                .setTitle(`Command: \`${command.data.name}\``)
                .setDescription(command.data.description || 'No description available.')
                .addFields(
                    { name: 'Usage', value: `/${command.data.name}`, inline: true },
                    { name: 'Category', value: 'Utility/Fun/Moderation (Add categories manually if needed)', inline: true }
                )
                .setFooter({ text: 'Use /help to see all commands.' });

            return interaction.reply({ embeds: [commandEmbed] });
        }

        // If no specific command is requested, list all commands
        const helpEmbed = new EmbedBuilder()
            .setColor('#00FFF3')
            .setTitle('Charlotte Help Menu')
            .setDescription('Here is a list of all available commands:')
            .setFooter({ text: 'Use /help <command> for more details about a specific command.' });

        // Organize commands by category (optional)
        const categories = {};
        commands.forEach(command => {
            const category = command.category || 'Uncategorized'; // Add a `category` property to commands if needed
            if (!categories[category]) categories[category] = [];
            categories[category].push(command);
        });

        // Add fields for each category
        for (const [category, cmds] of Object.entries(categories)) {
            helpEmbed.addFields({
                name: category,
                value: cmds.map(cmd => `\`${cmd.data.name}\`: ${cmd.data.description || 'No description'}`).join('\n'),
            });
        }

        return interaction.reply({ embeds: [helpEmbed] });
    },
};