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
};