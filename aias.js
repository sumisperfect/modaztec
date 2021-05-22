const { Client, Collection, Discord } = require("discord.js");
const db = require("quick.db");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
const ayar = require("./src/configs/config.json");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);
const Levels = require("discord-xp");
Levels.setURL(settings.mongoUrl);
const logs = require('discord-logs');
logs(client);
client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));





client.on("guildMemberAdd", async (member) => {
const tag = ayar.admins.tag
const kanal = ayar.admins.ekipLogKanali
const rol = ayar.admins.ekipRolu
  if (member.user.username.includes(tag)) {
    member.roles.add(rol)
    client.channels.cache.get(kanal).send(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${tag} sembolü bulunuyor.`)
}})


client.on("guildMemberAdd", async(member) => {
member.roles.add(ayar.registration.unregRoles)
})


//İltifat sistemi


const aiasq = [
 
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  
];

client.on("message", async message => {
  if(message.channel.id !== ayarlar.admins.chatKanal) return;
  let Aiasdev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Aiasdev >= 50) {  
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((aiasq ).length - 1) + 1);
    message.reply(`${(aiasq )[random]}`);
  };
});

//YASAKLI TAG
client.on("guildMemberAdd", member => {
  let birinciYasakli = "Never?";  // YASAKLANICAK TAG 1 
  let ikinciYasakli = "⚚"; // YASAKLANICAK TAG 2
  let ucuncuyasakli = "Ravens?";
  let yasakliRol = "845378700476416008";  //CEZALI ROL
  let kayitsizRol = '845378700430016533';  // KAYITSIZ ROL
  let logKanali = "845665884248211506";  // YASAKLI TAG LOG
  
  
  if(member.user.username.includes(birinciYasakli) && (member.user.username.includes(ikinciYasakli)) && (member.user.username.includes(ucuncuyasakli))) {
  member.roles.set([yasakliRol])
  member.roles.remove(kayitsizRol)
     client.channels.cache.get(logKanali).send(`<@${member.id}> sunucumuzun yasaklı taglarından birisinde bulunduğu için yasaklı tag rolü verildi.`)
  }
  })


    //YASAKLI TAG KONTROL
    setInterval(() => {
      const server = client.guilds.cache.get("845378700261982259"); //Server ID 
      server.members.cache.forEach(async member => {
   if (member.user.username.includes("Ravens")) {
              await member.roles.set(["845378700476416008"]).catch(() => {})

         }
      })
  }, 60 * 1000)


//Giriş çıkış log
client.on("guildMemberAdd", (member, message) => {
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
 if(ayar.logs.entriesLog && client.channels.cache.has(ayar.logs.sentriesLog)) client.channels.cache.get(ayar.logs.entriesLog).send(`:inbox_tray: ${member.user.tag} (\`${member.id}\`) katıldı. \`${üyesayısı}\` olduk.`)
})
client.on("guildMemberRemove", (member, message) => {
  let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
 if(ayar.logs.entriesLog && client.channels.cache.has(ayar.logs.entriesLog)) client.channels.cache.get(ayar.logs.entriesLog).send(`:outbox_tray: ${member.user.tag} (\`${member.id}\`) aramızdan ayrıldı. \`${üyesayısı}\` olduk.`)
})

//Rol verme alma log 
client.on("guildMemberRoleAdd", (member, role) => {
  if(ayar.logs.rolLog && client.channels.cache.has(ayar.logs.rolLog)) client.channels.cache.get(ayar.logs.rolLog).send(`${member.user.tag} (\`${member.id}\`) kullanıcısına \`${role.name}\` rolü eklendi.`);
 });
 client.on("guildMemberRoleRemove", (member, role) => {
  if(ayar.logs.rolLog && client.channels.cache.has(ayar.logs.rolLog)) client.channels.cache.get(ayar.logs.rolLog).send(`${member.user.tag} (\`${member.id}\`) kullanıcısından \`${role.name}\` rolü kaldırıldı.`);
 });

//NİCKNAME LOG
client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  if(ayar.logs.nicknameLog && client.channels.cache.has(ayar.logs.nicknameLog)) client.channels.cache.get(ayar.logs.nicknameLog).send(`
  ${member.user.tag} \`${member.user.id}\` kullanıcısının sunucu içi ismi değişti => \` ${oldNickname} > ${newNickname} \``);
  });

/// TAG
client.on('message', message => {
    const tag = message.content.toLowerCase()
    if (tag === '.tag' || tag === '!tag' || tag === 'tag') {
        message.channel.send(`${ayar.admins.tag}`);
    }
})


//Ses Hesaplama 

client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};


client.on("voiceStateUpdate",(oldMember, newMember) => {

if(newMember.channelID != null) {
db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
}

if(newMember.channelID == null) {
db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
}

 if (oldMember.channelID  != newMember.channelID  ) {
db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
}
})








   client.on("message", msg => {
           const reklam = [".com", ".tk", ".xyz", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz",".rf.gd", ".az", ".party", "discord.gg",];
           if (reklam.some(word => msg.content.includes(word))) {
             try {
               if (!msg.member.hasPermission("ADMINISTRATOR")) {
                     msg.delete();
                       return msg.reply('**Reklam yapman yasak lütfen reklam yapmamaya dikkat et !**').then(x => x.delete({timeout: 5000}));
    
               }              
             } catch(err) {
               console.log(err);
             }
           }
       });
  

 //ROL LOG
 const RoleDatabase = require("./src/schemas/rolveridb")
 var moment = require('moment-timezone');
 moment().tz("Europe/Istanbul").format('LL');
 
 client.on("guildMemberUpdate", async(oldMember, newMember) =>{
  let aldiverdi;
  if(oldMember.roles.cache.size < newMember.roles.cache.size){ aldiverdi = "✅ **Rol Verildi.**" } else { aldiverdi = "❌ **Rol Alındı.**"}
  if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
  let rolveren = await oldMember.guild.fetchAuditLogs({ type: 'GUILD_MEMBER_UPDATE' }).then(audit => audit.entries.first());
  let role = oldMember.roles.cache.find(s => !newMember.roles.cache.has(s.id)) || newMember.roles.cache.find(s => !oldMember.roles.cache.has(s.id))
  let aias = await RoleDatabase.findOne({ guildID: newMember.guild.id, kullanıcıID: newMember.id }) 
  if(!aias){
    let newRoleData = new RoleDatabase({
      guildID: newMember.guild.id,
      kullanıcıID: newMember.id,
      rolveridb: { staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi }
    }).save(); } else {
      aias.rolveridb.push({ staffID: rolveren.executor.id, tarih: Date.now(), rolid: role.id, type: aldiverdi })
      aias.save()
    }
}
  })
  Date.prototype.toTurkishFormatDate = function () {
    return moment.tz(this, "Europe/Istanbul").format('LL');
  };
  
 

client.on("ready", () => {
    client.user.setActivity("Ryno Moderation");
})