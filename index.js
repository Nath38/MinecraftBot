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

client.login(process.env.TOKEN);
