const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()

var prefix = ('+')

client.on('ready', () => {
  console.log('Le bot est prêt!')
});

client.on('ready', () => {
  client.user.setGame('+help')
  console.log('Joue à +help')
})

client.on('message', message => {
  if (message.content === prefix + 'ip') {
    message.reply("Le serveur n'est pas ouvert pour le moment")
    message.delete()
  }
})

client.on('message', message => {
    if (message.content === prefix + 'ping') {
      message.delete()
      message.channel.send('Calcul ...').then(message => {
      message.edit('Pong ! '+ Math.round(client.ping) + 'ms')
        })
      }
    })

client.on('message', message => {
  if (message.content === prefix + 'youtube') {
    message.reply('La chaîne Youtube de <@!315211194518470677> est https://www.youtube.com/channel/UCYLESxSomWcXTyeT-qLKWXw')
    message.delete()
  }
})

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setColor('#7FFF00')
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('589495005270376479').send(embed)
    member.addRole('588807227352285185')
 
});

client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
        .setColor('#B22222')
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('589495005270376479').send(embed)
 
});

client.on('message', async message => {
  if(message.content.startsWith(prefix + 'mp')){

    var args = message.content.split(" ").slice(1);
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
  
  if (args[0].toLowerCase() === prefix + "mute") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Membre introuvable")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
      if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
      let muterole = message.guild.roles.find(role => role.name === 'Mute')
      let userrole = message.guild.roles.find(role => role.name === 'joueur')
      if (muterole) {
          member.removeRole(userrole)
          member.addRole(muterole)
          message.channel.send(member + ' a été mute :white_check_mark:')
      }
      else {
          message.guild.createRole({name: 'Mute', permissions: 0}).then((role) => {
              message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                  channel.overwritePermissions(role, {
                      SEND_MESSAGES: false
                  })
              })
              member.addRole(role)
              message.channel.send(member + ' a été mute :white_check_mark:')
          })
      }
  }
})

client.on('message', message => {
  if (message.content === prefix + 'membre') {
    message.channel.send('Nous somme ' + message.guild.memberCount + ' sur ' + message.guild.name)
    message.delete()
  }
})

client.on('message', message => {
    if (message.content === prefix + 'help') {
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici les commandes !')
      .setDescription('Mon prefix est **' + prefix + '** et pour utiliser un commande faites **' + prefix +'<Commande>**')
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('youtube', "Lien de la chaîne YouTube de <@!315211194518470677>")
      .addField('ip', 'IP du serveur Minecraft')
      .addField('membre', 'Pour savoir combien somme ton sur le serveur')
      .addField('info', "Pour plus d'information sur le serveur")
      .addField('ping', 'Calculer le ping du bot')
      .addField('infos', 'Information sur le bot')
      .addField('help2', 'Commande administrateur')
      .setTimestamp()
      message.delete()
      message.channel.send(help_embed);
    }
  })

client.on('message', message => {
    if (message.content === prefix + 'help2') {
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici les commandes admin !')
      .setDescription('Mon prefix est **' + prefix + '** et pour utiliser un commande faites **' + prefix +'<Commande>**')
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('mp', 'Envoyer un message privé à tout le serveur')
      .addField('say', 'Ecrire une annonce')
      .addField('clear', 'Effacer des messages')
      .addField('mute', 'Mute un joueur')
      .addField('unmute', 'Unmute un joueur')
      .setTimestamp()
      message.delete()
      message.channel.send(help_embed);
    }
  })

client.on('message', message => {
  if (message.content === prefix + 'info') {
    var server_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("Informations du serveur")
    .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
    .addField("Server Name", message.guild.name)
    .addField("Créé le", message.guild.createdAt)
    .addField("Vous avez rejoint le", message.member.joinedAt)
    .addField("Total Membre", message.guild.memberCount);
    message.delete()
    message.channel.send(server_embed);
  }
})

client.on('guildMemberAdd', member =>{
  var role = member.guild.roles.find('name', 'joueur')
  member.addRole(role)
  
});

client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'ban'){
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
     if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
     message.guild.ban(member, {days: 7})
     message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
  }
});

client.on('message',message =>{
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === prefix + 'kick'){
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
     if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
     member.kick()
     message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
  }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    
        //unmute
        if(args[0].toLowerCase() === prefix + "unmute"){
          if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
          let member = message.mentions.members.first()
          if(!member) return message.channel.send("Membre introuvable")
          if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
          if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
          let muterole = message.guild.roles.find(role => role.name === 'Mute')
          let userrole = message.guild.roles.find(role => role.name === 'joueur')
          if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
          if(userrole && member.roles.has(muterole.id)) member.addRole(userrole)
          message.channel.send(member + ' a été unmute :white_check_mark:')
      }
   })

client.on('message', message => {
    if (message.content === prefix + 'infos') {
      var infos_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle('Voici mes informations !')
      .setDescription('')
      .setFooter('Commande exécuter par : ' + message.author.tag, message.author.avatarURL)
      .addField('Crée par:', "<@!315211194518470677>")
      .addField('Donations', " https://www.paypal.me/Chauchet ")
      .setTimestamp()
      message.delete()
      message.channel.send(infos_embed);
    }
  })


client.login(process.env.TOKEN);
