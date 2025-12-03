const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const dataFilePath = './storedData.json';

/**
 * Loads the stored data from our JSON file.
 * Returns an object mapping each custom name
 * to an array of imgur links.
 */
async function loadStoredData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If the file doesn't exist or is unreadable, return an empty object.
    return {};
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('custom')
    .setDescription('Spawns a random image from your stored imgur links')
    .addStringOption(option =>
      option.setName('customname')
        .setDescription('The custom name under which your images are stored')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Retrieve the provided custom name from the command options.
      const customName = interaction.options.getString('customname').trim();

      // Load the stored data from our JSON file.
      const storedData = await loadStoredData();

      // Check if the custom name exists and has images.
      if (!storedData[customName] || storedData[customName].length === 0) {
        return interaction.reply({
          content: `No images stored under \`${customName}\`. Please use the /store command first.`,
          ephemeral: true
        });
      }

      // Select one image at random.
      const imagesArray = storedData[customName];
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      const selectedImage = imagesArray[randomIndex];

      // (Optional) Generate a random spawner number for fun.
      const spawnerNumber = Math.floor(Math.random() * 1000) + 1;

      // Build the embed using the selected image.
      const spawnerEmbed = new EmbedBuilder()
        .setImage(selectedImage)
        .setAuthor({
          name: `${interaction.user.username} spawned "${customName}"`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setFooter({
          text: `Spawner Number: ${spawnerNumber}`
        })
        .setColor('#FBB22F');

      // Reply with the embed.
      await interaction.reply({ embeds: [spawnerEmbed] });
    } catch (error) {
      console.error('Error executing the custom command:', error);
      await interaction.reply({
        content: 'An error occurred while processing your request.',
        ephemeral: true
      });
    }
  },
};