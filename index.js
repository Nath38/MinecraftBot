const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

var prefix = ('!')

client.on('ready', () => {
  console.log('Le bot est prêt!')
});

client.on('message', message => {
  if (message.content === prefix + 'ip') {
    message.reply('L’ip du serveur est: myragyt.aternos.me')
    message.delete()
  }
})

client.on('message', message => {
  if (message.content === prefix + 'youtube') {
    message.reply('La chaîne Youtube de Rayan est https://www.youtube.com/channel/UC1vlGxvuH_HxiCxACLDtO5w')
    message.delete()
  }
})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setColor('#7FFF00')
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('588810496052953113').send(embed)
 
});

client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setColor('#B22222')
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('588810496052953113').send(embed)
 
});

client.login(process.env.TOKEN);
