const { SlashCommandBuilder } = require('discord.js');
const { QueryType, useQueue, useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music or stream audio from a YouTube URL.')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('The YouTube URL or search query')
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: 'You must be in a voice channel!', flags: 64 });
    }

    let query = interaction.options.getString('url');
    if (query.startsWith('https://youtu.be/')) {
  query = query.split('?')[0]; // Remove unnecessary query parameters
}if (!query) {
      return interaction.reply({ content: 'Please provide a valid YouTube URL or search query!', flags: 64 });
    }

    await interaction.deferReply({ flags: 64 });

    // Get or create the queue
    let queue = useQueue(interaction.guild.id);
    const player = useMainPlayer();

    if (!queue) {
      queue = player.nodes.create(interaction.guild, {
        metadata: {
          channel: interaction.channel,
          client: interaction.client,
          requestedBy: interaction.user,
        },
      });
    }

    try {
      if (!queue.connection) await queue.connect(voiceChannel);
    } catch (error) {
      console.error(error);
      if (queue) queue.delete();
      return interaction.editReply({ content: 'Could not join your voice channel!' });
    }

    const searchEngine = query.startsWith('http')
  ? QueryType.SPOTIFY_SONG // Use SPOTIFY_SONG for Spotify URLs
  : QueryType.YOUTUBE_SEARCH; // Use YOUTUBE_SEARCH for text queries

const result = await player.search(query, {
  requestedBy: interaction.user,
  searchEngine
});
    console.log("Search Result:", result);

    if (!result || !result.tracks.length) {
      return interaction.editReply({ content: 'No results found!' });
    }

    const track = result.tracks[0];
    queue.addTrack(track);
    if (!queue.isPlaying()) await queue.node.play();

    return interaction.editReply({ content: `Now playing: **${track.title}**` });
  }
};