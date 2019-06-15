const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

var prefix = ('p.')

client.on('ready', () => {
  console.log('Le bot est prêt!')
});

client.login(process.env.TOKEN);


