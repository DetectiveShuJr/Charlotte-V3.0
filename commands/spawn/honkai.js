const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const valkyries = require('./valkyries.json'); // Move data to a separate JSON file

const DEFAULT_COLOR = '#ffc354';

// Single-character colors, checked in this priority order as a fallback
// when no combo rule below matches.
const SINGLE_COLORS = {
    'Bronya': '#45a2ff',
    'Seele': '#A020F0',
    'Kiana': '#e5e4e2',
    'Mei': '#d2bbff',
    'Veli': '#B80F0A',
    'Fu Hua': '#4589bd',
    'Theresa': '#E5E4E2',
    'Sakura': '#F2A6C9',
    'Durandal': '#F0DCA0',
    'Rita': '#B5A3FF',
    'Starlit': '#E5E4E2',
    'Senti': '#999DA0',
    'Sirin': '#B6A1D6',
};
const KEYWORD_ORDER = Object.keys(SINGLE_COLORS);

/**
 * Picks an embed color for a given Valkyrie stamp name.
 * Names are messy (emoji, punctuation, varied phrasing), so this matches
 * on character keywords appearing anywhere in the name rather than exact
 * phrases like "Bronya and Seele".
 */
function getEmbedColor(name) {
    if (/flame chasers/i.test(name)) {
        return '#F73718';
    }

    const lower = name.toLowerCase();
    const indexOf = (kw) => lower.indexOf(kw.toLowerCase());
    const has = (kw) => indexOf(kw) !== -1;

    // Combo rules take priority over single-character colors.
    if (has('Kiana') && has('Fu Hua')) {
        return '#E5E4E2';
    }
    if (has('Bronya') && has('Seele')) {
        return '#0080FE';
    }
    if (has('Seele') && has('Veli')) {
        // Word order decides which of the two given rules applies:
        // "Seele ... Veli" -> blue, "Veli ... Seele" -> red.
        return indexOf('Seele') < indexOf('Veli') ? '#0080FE' : '#B80F0A';
    }

    for (const kw of KEYWORD_ORDER) {
        if (has(kw)) {
            return SINGLE_COLORS[kw];
        }
    }

    return DEFAULT_COLOR;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('honkai')
        .setDescription('A spawn command'),
    async execute(interaction) {
        try {
            const randomIndex = Math.floor(Math.random() * valkyries.length);
            const { name: valkyrieName, image: valkyrieImage, number: valkyrieNumber } = valkyries[randomIndex];

            const valkyrieEmbed = new EmbedBuilder()
                .setImage(valkyrieImage)
                .setURL(interaction.user.displayAvatarURL())
                .setAuthor({ name: `${interaction.user.username} drew ${valkyrieName}`, iconURL: interaction.user.displayAvatarURL() })
                .setFooter({ text: `Here\'s your mini Valkyrie stamp\n${valkyrieNumber}`, iconURL: valkyrieImage })
                .setColor(getEmbedColor(valkyrieName));

            interaction.reply({ embeds: [valkyrieEmbed] });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};

// const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// const valkyries = require('./valkyries.json'); // Move data to a separate JSON file

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('honkai')
//         .setDescription('A spawn command'),
//     async execute(interaction) {
//         try {
//             const randomIndex = Math.floor(Math.random() * valkyries.length);
//             const { name: valkyrieName, image: valkyrieImage, number: valkyrieNumber } = valkyries[randomIndex];

//             const valkyrieEmbed = new EmbedBuilder()
//                 .setImage(valkyrieImage)
//                 .setURL(interaction.user.displayAvatarURL())
//                 .setAuthor({ name: `${interaction.user.username} drew ${valkyrieName}`, iconURL: interaction.user.displayAvatarURL() })
//                 .setFooter({ text: `Here\'s your mini Valkyrie stamp\n${valkyrieNumber}`, iconURL: valkyrieImage })
//                 .setColor('#FBB22F');

//             interaction.reply({ embeds: [valkyrieEmbed] });
//         } catch (error) {
//             console.error(error);
//             interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
//         }
//     },
// };