const { SlashCommandBuilder } = require("discord.js");
const Discord = require('discord.js')

    
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unnamed')
		.setDescription("Replies with a honkai image!!"),
	async execute(interaction) {
		await interaction.deferReply('testing').setTimeout(60_000)
await interaction.editReply('test')
	},
};