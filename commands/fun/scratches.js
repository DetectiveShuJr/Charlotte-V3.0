const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scratches')
    .setDescription('Scratches target user with a fun GIF!')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to scratch (leave blank to scratch yourself)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('target') || interaction.user;
    const author = interaction.user;

    const scratchGifs = [
      'https://i.ibb.co/4Z6sxHtJ/love-live-anime.gif',
      'https://i.ibb.co/ksxf3Dpx/chocola-anime.gif',
      'https://i.ibb.co/BVbMkpR8/skritches-scritches.gif',
      'https://i.ibb.co/fR2YXp3/anime-cat-girl-anime.gif',
      'https://i.ibb.co/HpDsvpY4/anime-acchi-kocchi.gif',
    ];

    const randomGif = scratchGifs[Math.floor(Math.random() * scratchGifs.length)];

    const scratchEmbed = new EmbedBuilder()
      .setColor('#E0FBFF')
      .setImage(randomGif);

    if (targetUser.id === author.id) {
      scratchEmbed
        .setAuthor({ name: `${author.username} just scratched themselves..? weirdo`, iconURL: author.displayAvatarURL() })
        .setFooter({ text: `${author.username} just scratched themselves. Ouch!`, iconURL: author.displayAvatarURL() });
    } else if (targetUser.id === interaction.client.user.id) {
      scratchEmbed
        .setAuthor({ name: `That feels nice... ${author.username}, It's relaxing`, iconURL: author.displayAvatarURL() })
        .setFooter({ text: `I wouldn't mind some scratches once in a while...`, iconURL: author.displayAvatarURL() });
    } else {
      scratchEmbed
        .setAuthor({ name: `${author.username} decided to scratch ${targetUser.username}, they look like they enjoyed it`, iconURL: author.displayAvatarURL() })
        .setFooter({ text: `${author.username} just scratched ${targetUser.username}. They seem happy!`, iconURL: targetUser.displayAvatarURL() });
    }

    await interaction.reply({ embeds: [scratchEmbed] });
  },
};