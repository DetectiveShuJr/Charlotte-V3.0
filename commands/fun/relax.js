const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('relax')
        .setDescription('Relax by yourself or with someone else!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want to relax with (leave blank to relax alone)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Randomly select a GIF from the "relax" folder
        const numberOfGifs = 9; // Total number of GIFs in the "relax" folder
        const randomGifNumber = Math.floor(Math.random() * numberOfGifs) + 1;
        const gifPath = path.join(__dirname, '..', '..', 'relax', `${randomGifNumber}.gif`);

        // Create the embed
        const relaxEmbed = new EmbedBuilder()
            .setColor('#00ADEF')
            .setImage(`attachment://${randomGifNumber}.gif`);

        // Handle different scenarios
        if (targetUser.id === author.id) {
            relaxEmbed
                .setAuthor({ name: `${author.username} is relaxing... Ah, I may as well join in!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Relaxing is always a good idea!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        } else if (targetUser.id === '663616911992422400') {
            if (author.id === '345261532982280194') {
                relaxEmbed
                    .setAuthor({ name: 'Finally, you spend time with me. This is great!', iconURL: author.displayAvatarURL({ dynamic: true }) })
                    .setFooter({ text: 'Relaxing together is the best!', iconURL: author.displayAvatarURL({ dynamic: true }) });
            } else {
                return interaction.reply({
                    content: 'Huh?! No, not happening.',
                    ephemeral: true,
                });
            }
        } else {
            relaxEmbed
                .setAuthor({ name: `${author.username} and ${targetUser.username} are relaxing together. They look so cute!`, iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Relaxing with friends is always better!', iconURL: author.displayAvatarURL({ dynamic: true }) });
        }

        // Reply with the embed and attach the GIF
        await interaction.reply({
            embeds: [relaxEmbed],
            files: [{ attachment: gifPath, name: `${randomGifNumber}.gif` }],
        });
    },
};