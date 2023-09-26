module.exports = {
    name: 'taunt',
    Description: 'fun little gif command',
    execute(message, args1) {
    let mention = message.mentions.users.first()  || message.guild.members.cache.find((p) =>
    p.user.username.includes(args1[0]))  || message.guild.members.cache.find((p) =>
    p.user.username.toUpperCase().includes(args1[0])) || message.guild.members.cache.find((p) =>
    p.user.username.toLowerCase().includes(args1[0])) || message.guild.members.cache.find((p) =>
    p.user.username === args1[0]) || message.guild.members.cache.find((p) =>
    p.user.username.toUpperCase() === args1[0]) || message.guild.members.cache.find((p) =>
    p.user.username.toLowerCase() === args1[0])
    number = 5;
    switch(Math.floor (Math.random() * 5)){
        case 1:
            tauntImage = 'https://imgur.com/UUocFxH'
            break;
        case 2:
            tauntImage = 'https://imgur.com/5i9Y8GD'
            break;
        case 3:
            tauntImage = 'https://imgur.com/LFcOsRv'
            break;
        case 4:
            tauntImage = 'https://imgur.com/jDFDnGN'
            break;
        case 5:
            tauntImage = 'https://imgur.com/EhC5cOF'
            break;
    }
        if (mention == null){
            const Discord = require('discord.js')
            const tauntEmbed = new Discord.MessageEmbed()
                .setColor('#CACC36')
                .setAuther(`Hey! ${message.auther.username} is taunting us, let's get them!`)
                .setImage(tauntImage)

                message.channel.send(tauntEmbed)
            }else{
                if(mention == sender) return
                if(mention.id == '663616911992422400')
                if(sender.id == '345261532982280194'){
                    const Discord = require('discord.js')
                    const tauntEmbed = new Discord.MessageEmbed()
                    .setColor('#CACC36')
                    .setAuthor(`Hey! What did I do wrong?!`)
                    .setImage(tauntImage)

                message.channel.send(tauntEmbed)
            }else{
                if(mention.id == sender) return
                if(mention.id == '663616911992422400') return
                const Discord = require('discord.js')
                const tauntEmbed = new Discord.MessageEmbed()
                .setColor('#CACC36')
                .setAuthor(`I wouldn't suggest taunting ${mention} but go for it`)
                .setImage(tauntImage)
                   
                message.channel.send(tauntEmbed)
            }
        }
    }
}