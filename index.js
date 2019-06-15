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

client.login(process.env.TOKEN);

