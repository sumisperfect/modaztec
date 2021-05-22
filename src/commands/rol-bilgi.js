
const { MessageEmbed, } = require("discord.js");

exports.run = async(client, message, args) => {
        let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!rol) return;

        let rolrenk = `${rol.hexColor}`
        let rolID = `${rol.id}`
        let roluyesayi = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).size}`
        let rolkisiler = `${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).map(x => `${x} - (\`${x.id}\`)`).join("\n")}`

message.channel.send(`
- ${rol} rol bilgileri;
- Rol Renk: ${rolrenk}
- Rol ID: \`${rolID}\`
- Roldeki kişi sayısı: \`${roluyesayi}\`

- Roldeki kişiler;
${rolkisiler}
`, {split: true})
};
exports.conf = {
    name: "rolbilgi",
    aliases: [],
    permLevel: 0
};