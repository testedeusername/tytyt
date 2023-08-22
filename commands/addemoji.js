const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');


module.exports = {
  name: "addemoji",
  aliases: ["adde"],
  description: "Adciona o emoji requerido pela pessoa",

  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000)
    })

    if (!args.length)
    return message.channel.send({content: '**Especifique o emoji que deseja adcionar no servidor!**'});

    for (const emojis of args) {
        const getEmoji = Discord.Util.parseEmoji(emojis);


        if (getEmoji.id) {
            const emojiExt = getEmoji.animated ? '.gif' : '.png';
            const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
            message.guild.emojis
            .create(emojiURL, getEmoji.name)
            .then((emoji) =>
            
            message.channel.send(`✅ | Emoji adicionado com sucesso!`)
            );
        }
    }
    
}

}