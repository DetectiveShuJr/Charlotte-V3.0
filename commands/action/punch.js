const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('punch')
    .setDescription('fun little gif command')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Punching bag')
        .setRequired(true)
        ),
    async execute(interaction) {

        number = 27
        number1 = 1

    switch(Math.floor (Math.random() * number)){
        case 1:
            punchImage = 'https://imgur.com/27J2BOb'
            break;
        case 2:
            punchImage = 'https://imgur.com/Y9dKW1U'
            break;
        case 3:
            punchImage = 'https://imgur.com/qkwrGV1'
            break;
        case 4:
            punchImage = 'https://imgur.com/xWBXRm3'
            break;
        case 5:
            punchImage = 'https://imgur.com/ShLN211'
            break;
        case 6:
            punchImage = 'https://imgur.com/nnYEjF1'
            break;
        case 7:
            punchImage = 'https://imgur.com/ywINotQ'
            break;
        case 8:
            punchImage = 'https://imgur.com/aaJ0N3L'
            break;
        case 9:
            punchImage = 'https://imgur.com/f3j1kwK'
            break;
        case 10:
            punchImage = 'https://imgur.com/VsG7oSu'
            break;
        case 11:
            punchImage = 'https://imgur.com/9L4d1lg'
            break;
        case 12:
            punchImage = 'https://imgur.com/lq6wOjP'
            break;
        case 13:
            punchImage = 'https://imgur.com/jSVUeb9'
            break;
        case 14:
            punchImage = 'https://imgur.com/yBO6wdt'
            break;
        case 15:
            punchImage = 'https://imgur.com/7HIeZtQ'
            break;
        case 16:
            punchImage = 'https://imgur.com/Ylqltlz'
            break;
        case 17:
            punchImage = 'https://imgur.com/UOy0U5R'
            break;
        case 18:
            punchImage = 'https://imgur.com/tzyP8pj'
            break;
        case 19:
            punchImage = 'https://imgur.com/nFe4SEf'
            break;
        case 20:
            punchImage = 'https://imgur.com/4c2QSGd'
            break;
        case 21:
            punchImage = 'https://imgur.com/S0CE73p'
            break;
        case 22:
            punchImage = 'https://imgur.com/guLsMaH'
            break;
        case 23:
            punchImage = 'https://imgur.com/obbFyJW'
            break;
        case 24:
            punchImage = 'https://imgur.com/tJ4MXJ5'
            break;
        case 25:
            punchImage = 'https://imgur.com/RAngs7q'
            break;
        case 26:
            punchImage = 'https://imgur.com/VgSamo6'
            break;
        case 27:
            punchImage = 'https://imgur.com/my2KUjj'

        switch(Math.floor (Math.random() * (number1))){
        case 1:
            punchImage1 = 'https://imgur.com/iApIQPj'
            break;
        }
        
            if(interaction.getMember() == '663616911992422400')
            if(interaction.user.id === '345261532982280194'){
                const Discord = require('discord.js');
                const punchEmbed = new EmbedBuilder()
                    .setColor('#ff2e2e')
                    .setAuthor({ name: `That breaks so many child abuse laws... Go die`})
                    .setImage(punchImage1)
                    .setFooter({
                        text: `${interaction.username} was thrown out the window by me!`,
                        iconURL: interaction.user.displayAvatarURL() })

                interaction.reply({ embeds: [punchEmbed] });
            }else{
                if(interaction.user.id == '345261532982280194') return
            }else{
            if(interaction.options.getUsers == interaction.user.id) return
                const Discord = require('discord.js');
                const punchEmbed = new Discord.MessageEmbed()
                    .setColor('#ff2e2e')
                    .setAuthor({ name: `${interaction.user.username} just threw a punch at ${interaction.options.getUser().username}... Oh boy`})
                    .setImage(punchImage)
                .setFooter({ 
                    text: `${interaction.user.username} punched ${interaction.options.getUser().username}`, 
                    iconURL: message.author.displayAvatarURL()})

                interaction.reply({ embeds: [punchEmbed] });
            }
            const punchEmbed = new EmbedBuilder()
                .setColor('#ff2e2e')
                .setAuthor({ name: `Why are you hitting yourself ${interaction.user.username}? Oh well, I don't make the rules`})
                .setImage(punchImage)
                .setFooter({
                    text: `${interaction.user.username} just punched themselves...?`, 
                    iconURL: message.author.displayAvatarURL()
                })
            interaction.reply({ embeds: [punchEmbed]})
        }
    }
}