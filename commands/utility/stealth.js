const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stealth')
        .setDescription('Charlotte will repeat your message without tagging you.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want Charlotte to repeat')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Get the message from the user input
        const userMessage = interaction.options.getString('message');

        // Delete the interaction reply (ephemeral response)
        await interaction.reply({
            content: 'Message sent!',
            ephemeral: true, // Only visible to the user
        });

        // Send the user's message to the channel
        await interaction.channel.send(userMessage);
    },
};