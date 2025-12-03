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
  } catch (error) {
    // Return an empty object if the file doesn't exist.
    return {};
  }
}

/**
 * Saves the provided data object to the JSON file.
 */
async function saveData(data) {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Deletes an imgur link or an entire custom group')
    // Subcommand for deleting a specific link.
    .addSubcommand(subcommand =>
      subcommand
        .setName('link')
        .setDescription('Delete a specific imgur link from a custom group')
        .addStringOption(option =>
          option
            .setName('customname')
            .setDescription('The custom group name')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('imgurl')
            .setDescription('The direct imgur link to remove')
            .setRequired(true)
        )
    )
    // Subcommand for deleting an entire group.
    .addSubcommand(subcommand =>
      subcommand
        .setName('group')
        .setDescription('Delete the entire custom group')
        .addStringOption(option =>
          option
            .setName('customname')
            .setDescription('The custom group name to delete')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();
      // Load the existing data.
      const storedData = await loadData();

      if (subcommand === 'link') {
        const customName = interaction.options.getString('customname').trim();
        const imgurl = interaction.options.getString('imgurl').trim();

        // Check if the specified custom group exists.
        if (!storedData[customName] || storedData[customName].length === 0) {
          return interaction.reply({
            content: `No stored links found under "${customName}".`,
            ephemeral: true,
          });
        }

        // Check if the provided link exists.
        const index = storedData[customName].indexOf(imgurl);
        if (index === -1) {
          return interaction.reply({
            content: `The provided link was not found under "${customName}".`,
            ephemeral: true,
          });
        }

        // Remove the link.
        storedData[customName].splice(index, 1);

        // Optional: If the group becomes empty, delete the group.
        if (storedData[customName].length === 0) {
          delete storedData[customName];
          await saveData(storedData);
          return interaction.reply({
            content: `Link removed. The "${customName}" group is now empty and has been deleted.`,
            ephemeral: true,
          });
        }

        // Save updated data.
        await saveData(storedData);
        return interaction.reply({
          content: `Successfully removed the link from "${customName}".`,
          ephemeral: true,
        });
      } else if (subcommand === 'group') {
        const customName = interaction.options.getString('customname').trim();

        // Check if the group exists.
        if (!storedData[customName]) {
          return interaction.reply({
            content: `The custom group "${customName}" does not exist.`,
            ephemeral: true,
          });
        }

        // Delete the entire group.
        delete storedData[customName];
        await saveData(storedData);
        return interaction.reply({
          content: `Successfully deleted the entire group "${customName}".`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error('Error processing delete command:', error);
      return interaction.reply({
        content: 'An error occurred while processing your request.',
        ephemeral: true,
      });
    }
  },
};