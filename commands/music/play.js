<<<<<<< HEAD
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
=======
const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a YouTube video in a voice channel.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The YouTube video URL')
                .setRequired(true)
        ),
    async execute(interaction) {
        const url = interaction.options.getString('url');

        // Validate the YouTube URL
        if (!ytdl.validateURL(url)) {
            return interaction.reply({
                content: 'Please provide a valid YouTube video URL.',
                ephemeral: true,
            });
        }

        // Check if the user is in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: 'You need to be in a voice channel to use this command!',
                ephemeral: true,
            });
        }

        // Join the voice channel
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        // Create an audio player
        const player = createAudioPlayer();

        // Stream the YouTube video
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        const resource = createAudioResource(stream);

        // Play the audio resource
        player.play(resource);
        connection.subscribe(player);

        // Handle player events
        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio is now playing!');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log('The audio has finished playing!');
            connection.destroy(); // Leave the voice channel when done
        });

        player.on('error', error => {
            console.error('Error playing audio:', error);
            connection.destroy();
        });

        // Reply to the user
        await interaction.reply(`🎶 Now playing: **${url}**`);
    },
>>>>>>> 70931abe7cfd7d496e72d639d8b294c57144c792
};