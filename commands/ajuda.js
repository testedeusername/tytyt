const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "ajuda",
    run: async(client, message, args) => {        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('retornar')
            .setEmoji('◀')
            .setDisabled(true)
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('proxima')
            .setEmoji('▶')
            .setDisabled(false)
            .setStyle('PRIMARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Meus Comandos`)
          .setDescription(`
⚙️ | ${config.get(`prefix`)}ajuda - Veja meus comandos
⚙️ | ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
⚙️ | ${config.get(`prefix`)}botinfo - Veja minhas informações
⚙️ | ${config.get(`prefix`)}info - Veja informações de uma compra
⚙️ | ${config.get(`prefix`)}perfil - Veja seu perfil
⚙️ | ${config.get(`prefix`)}status - Veja os status de vendas
⚙️ | ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
⚙️ | ${config.get(`prefix`)}pegar - Veja um produto entregue
⚙️ | ${config.get(`prefix`)}pagar - Sete um id de uma compra como pago
⚙️ | ${config.get(`prefix`)}criargift - Crie um código Gift
⚙️ | ${config.get(`prefix`)}resgatar - Resgate um código Gift
⚙️ | ${config.get(`prefix`)}criarcupom - Crie um cupom de desconto
⚙️ | ${config.get(`prefix`)}configcupom - Gerencie um cupom de desconto
⚙️ | ${config.get(`prefix`)}limpar - Apague as mensagens do chat
⚙️ | ${config.get(`prefix`)}criados - Veja todos os produtos, cupons e gifts criados
`)
          .setTimestamp()
          .setFooter(`Pagina 1/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", })
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) { return; }
            if (interaction.customId === 'retornar') {
              interaction.deferUpdate();
              row.components[0].setDisabled(true)
              row.components[1].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setDescription(`
⚙️ | ${config.get(`prefix`)}ajuda - Veja meus comandos
⚙️ | ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
⚙️ | ${config.get(`prefix`)}botinfo - Veja minhas info
⚙️ | ${config.get(`prefix`)}info - Veja info de uma compra
⚙️ | ${config.get(`prefix`)}perfil - Veja seu perfil
⚙️ | ${config.get(`prefix`)}status - Veja os status de vendas
⚙️ | ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
⚙️ | ${config.get(`prefix`)}pegar - Veja um produto entregue
⚙️ | ${config.get(`prefix`)}pagar - Altere um id para pago
⚙️ | ${config.get(`prefix`)}criargift - Crie um Gift
⚙️ | ${config.get(`prefix`)}resgatar - Resgatar um código Gift
⚙️ | ${config.get(`prefix`)}criarcupom - Crie um cupom
⚙️ | ${config.get(`prefix`)}configcupom - Gerencie um cupom
⚙️ | ${config.get(`prefix`)}limpar - Apague as mensagens do chat
⚙️ | ${config.get(`prefix`)}criados - Veja todos os produtos, cupons e gifts criados
`)
                .setTimestamp()
                .setFooter(`Pagina 1/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
            }
             
            if (interaction.customId === 'proxima') {
              interaction.deferUpdate();
              row.components[0].setDisabled(false)
              row.components[1].setDisabled(true)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setDescription(`
⚙️ | ${config.get(`prefix`)}configbot - Configure o bot **(obrigatório)**
⚙️ | ${config.get(`prefix`)}configcanais - Configura os canais **(obrigatório)**
⚙️ | ${config.get(`prefix`)}configstatus - Configura os status **(obrigatório)**
⚙️ | ${config.get(`prefix`)}criar - Crie um produto
⚙️ | ${config.get(`prefix`)}setar - Sete um produto
⚙️ | ${config.get(`prefix`)}config - Gerencie um produto
⚙️ | ${config.get(`prefix`)}estoque - Gerencie um estoque
⚙️ | ${config.get(`prefix`)}rank - Veja o ranking de clientes
⚙️ | ${config.get(`prefix`)}permadd - Adicione um administrador
⚙️ | ${config.get(`prefix`)}donoadd - Adicione um dono
⚙️ | ${config.get(`prefix`)}permdel - Remova um administrador
⚙️ | ${config.get(`prefix`)}donodel - Remova um dono
`)
                .setTimestamp()
                .setFooter(`Pagina 2/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
              embed.edit({ embeds: [embednew], components: [row] })
              }
            })
          }
        }