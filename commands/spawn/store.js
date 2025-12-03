const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const dataFilePath = './storedData.json';

/**
 * Loads the stored data from the JSON file.
 * Returns an object mapping custom names to arrays of imgur links.
 */
async function loadData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or is unreadable, return an empty object.
    return {};
  }
}

/**
 * Saves the provided data object to the JSON file.
 */
async function saveData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing data:', err);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('store')
    .setDescription('Stores imgur links under a custom name')
    .addStringOption(option =>
      option
        .setName('imgurls')
        // Shortened description to meet the 100 character limit.
        .setDescription('Comma-separated imgur links (e.g. https://i.imgur.com/XXX.jpg, https://i.imgur.com/YYY.png)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('customname')
        .setDescription('The name to store your images under')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Retrieve the image links and custom name provided by the user.
      const imgurlsInput = interaction.options.getString('imgurls');
      const customName = interaction.options.getString('customname').trim();

      // Split the input string on commas, trim each URL, and filter out empty strings.
      let imgurlArray = imgurlsInput
        .split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      // Regular expression to validate direct imgur image links.
      const imgurRegex = /^https?:\/\/i\.imgur\.com\/\w+\.(jpg|jpeg|png|gif)$/i;

      // Separate valid and invalid links.
      let validUrls = [];
      let invalidUrls = [];
      for (const url of imgurlArray) {
        if (imgurRegex.test(url)) {
          validUrls.push(url);
        } else {
          invalidUrls.push(url);
        }
      }

      // If no valid URLs are provided, inform the user and exit.
      if (validUrls.length === 0) {
        return interaction.reply({
          content: 'No valid imgur links were provided. Use direct links (e.g. https://i.imgur.com/XXX.jpg).',
          ephemeral: true
        });
      }

      // Load the current stored data.
      const storedData = await loadData();

      // Ensure the custom name exists in the object.
      if (!storedData[customName]) {
        storedData[customName] = [];
      }

      // Append each valid URL if it is not already in the list.
      let duplicates = [];
      for (const url of validUrls) {
        if (!storedData[customName].includes(url)) {
          storedData[customName].push(url);
        } else {
          duplicates.push(url);
        }
      }

      // Save the updated data back to the file.
      await saveData(storedData);

      // Build a reply message.
      let replyMsg = `Successfully stored ${validUrls.length - duplicates.length} new link(s) under \`${customName}\`.`;
      if (duplicates.length > 0) {
        replyMsg += `\nThese link(s) were already stored: ${duplicates.join(', ')}`;
      }
      if (invalidUrls.length > 0) {
        replyMsg += `\nThese link(s) were invalid and not added: ${invalidUrls.join(', ')}`;
      }

      return interaction.reply({ content: replyMsg, ephemeral: true });
    } catch (error) {
      console.error('Error storing custom images:', error);
      return interaction.reply({
        content: 'An error occurred while processing your request.',
        ephemeral: true
      });
    }
  },
};