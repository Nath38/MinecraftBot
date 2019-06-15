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

client.on('message', async message => {
  if(message.content.startsWith(prefix + 'mp')){

    var args = message.co'ntent.split(" ").slice(1);
    var msge = args.join(' ');

    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send("Tu ne peux pas utiliser cette commande.");
    if(!msge) return message.channel.send('Precise un message !')

    var mpall = new Discord.RichEmbed()
    .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setColor('RANDOM')
    .addField('Annonce à lire', msge);
    message.delete()
    message.guild.members.map(m => m.send(mpall))
  }
});

client.on('message', async message => {
  if(message.content.startsWith(prefix + 'say')){

    var args = message.content.split(" ").slice(1);
    var messageToBot = args.join(' ');

    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send("Tu ne peux pas utiliser cette commande.");
    if(!messageToBot) return message.channel.send('Precise un message !')

    var say = new Discord.RichEmbed()
    .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setColor('RANDOM')
    .addField('Annonce à lire', messageToBot);
    message.delete()
    message.channel.send(say);
  }
});

client.on("message", message => {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === prefix + "clear") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let count = args[1]
      if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
      if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
      if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
      message.channel.bulkDelete(parseInt(count) + 1)
  }
})

client.on('message', message => {
    if (message.content === prefix + 'help') {
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici les commandes !')
      .setDescription('Mon prefix est **!** et pour utiliser un commande faites **!<Commande>**')
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('youtube', "Lien de la chaîne YouTube de Rayan")
      .addField('ip', 'IP du serveur Minecraft')
      .addField('mp', 'Réservé au admin')
      .addField('say', 'Reservé au admin')
      .setTimestamp()
      message.delete()
      message.channel.send(help_embed);
    }
  })

client.login(process.env.TOKEN);
