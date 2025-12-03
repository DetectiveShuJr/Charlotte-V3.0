const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('upload-command')
        .setDescription('Upload a new command to the bot.')
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('The JavaScript file for the new command')
                .setRequired(true)
        ),
    async execute(interaction) {
        const file = interaction.options.getAttachment('file');

        // Ensure the file is a JavaScript file
        if (!file.name.endsWith('.js')) {
            return interaction.reply({
                content: 'Please upload a valid JavaScript (.js) file.',
                ephemeral: true,
            });
        }

        // Download and save the file to the `user-commands` folder
        const userCommandsPath = path.join(__dirname, '..', 'user-commands');
        if (!fs.existsSync(userCommandsPath)) {
            fs.mkdirSync(userCommandsPath);
        }

        const filePath = path.join(userCommandsPath, file.name);
        const response = await fetch(file.url);
        const fileData = await response.text();

        fs.writeFileSync(filePath, fileData);

        // Reload commands
        loadCommands();

        return interaction.reply({
            content: `The command \`${file.name}\` has been uploaded and loaded successfully!`,
            ephemeral: true,
        });
    },
};