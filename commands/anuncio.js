const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "anuncio", // Coloque o nome do comando do arquivo
    aliases: ["say"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão de \`Administradr\` para poder utilziar este comando.`)
    } else {
        let embed_1 = new Discord.MessageEmbed()
        .setColor(config.get(`color`))
        .setDescription(`${message.author} Qual será o chat para enviar o anúncio?`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor(config.get(`color`))
        .setDescription(`${message.author} Não foi possível reconhecer um canal de texto.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor(config.get(`color`))
        .setDescription(`${message.author} Qual será o título do anúncio?`);

        let embed_3 = new Discord.MessageEmbed()
        .setColor(config.get(`color`))
        .setDescription(`${message.author} Qual será a descrição do anúncio?`);

        message.reply({ embeds: [embed_1] }).then(msg => {
            let coletor_1 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

            coletor_1.on("collect", (palavra_1) => {
                let chat = palavra_1.mentions.channels.first() || message.guild.channels.cache.get(palavra_1.content);

                if (!chat) {
                    palavra_1.reply({ embeds: [embed_erro] })
                } else
                if (chat) {
                    message.reply({ embeds: [embed_2] }).then(m_2 => {

                        let coletor_2 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                        coletor_2.on("collect", (palavra_2) => {

                            let titulo = palavra_2.content;

                             message.reply({ embeds: [embed_3] }).then(m_3 => {

                                let coletor_3 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_3.on("collect", (palavra_3) => {

                                    let desc = palavra_3.content;
                                    
                                    message.reply(`O aviso foi enviado para ${chat} com sucesso.`).then(m => {
                                        chat.send({ embeds: [
                                            new Discord.MessageEmbed()
                                            .setTitle(titulo)
                                            .setDescription(desc)
                                            .setColor(config.get(`color`))
                                            .setTimestamp(new Date)
                                            //.setThumbnail(message.guild.iconURL({ dynamic: true }))
                                            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                            //.setAuthor(message.guild.iconURL({ dynamic: true }))
                                        ] }).catch(e => { m.edit({ content: `${message.author} Algo deu errado.`, embeds: [] }) })
                                    })

                                })
                             })
                        })
                    })
                }
            })
          
            
        })
    }

       
        
    }
}