const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('littles-defense')
        .setDescription('Defend yourself or someone else with a fun GIF!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to defend against (leave blank to defend yourself)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target') || interaction.user; // Default to the command user
        const author = interaction.user;

        // Array of defense GIFs
        const defenseGifs = [
            'https://i.ibb.co/6gTrZTr/rapunzel-frying-pan.gif',
            'https://i.ibb.co/4Rr94xT/20220123-142946.gif',
            'https://i.ibb.co/BcyBNKW/tangled-disney.gif',
            'https://i.ibb.co/mJ0ddGM/2-1.gif',
            'https://i.ibb.co/Kb7TLhR/20220524-000644.gif',
        ];

        // Randomly select a defense GIF
        const randomGif = defenseGifs[Math.floor(Math.random() * defenseGifs.length)];

        // Create the embed
        const defenseEmbed = new EmbedBuilder()
            .setColor('#FFC0CB') // Use a valid hexadecimal color code (e.g., pink)
            .setImage(randomGif);

        // Handle different scenarios
        if (author.id !== '303410762213490689') {
            defenseEmbed
                .setAuthor({ name: 'Simply no, only mom can!', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'You aren\'t a Little! Get the heck out of here!', iconURL: author.displayAvatarURL({ dynamic: true }) });
            return interaction.reply({ embeds: [defenseEmbed], ephemeral: true });
        }

        if (targetUser.id === author.id) {
            defenseEmbed
                .setAuthor({ name: 'Did you just hit yourself...? Maybe Dad isn\'t the only dumb one here.', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} forgot how to use a pan`, iconURL: author.displayAvatarURL({ dynamic: true }) });
            return interaction.reply({ embeds: [defenseEmbed] });
        }

        if (targetUser.id === '663616911992422400') {
            defenseEmbed
                .setAuthor({ name: 'Nice try mom but no.', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `${author.username} really did try it!`, iconURL: author.displayAvatarURL({ dynamic: true }) });
            return interaction.reply({ embeds: [defenseEmbed] });
        }

        if (targetUser.id === '345261532982280194') {
            defenseEmbed
                .setAuthor({ name: 'Nice try Princess, but Daddy wouldn\'t allow this!', iconURL: author.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: 'Dad took the wheel on this part of the command, good luck Mom!', iconURL: author.displayAvatarURL({ dynamic: true }) });
            await targetUser.send('Mom tried punishing you.');
            return interaction.reply({ content: 'And... just messaged Dad.', embeds: [defenseEmbed] });
        }

        defenseEmbed
            .setAuthor({ name: `Looks like ${targetUser.username} triggered mom, oh boy...`, iconURL: author.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `${author.username} punished ${targetUser.username}`, iconURL: author.displayAvatarURL({ dynamic: true }) });

        return interaction.reply({ embeds: [defenseEmbed] });
    },
};