const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando'),
	  path = require('path'),
	  { PlayerManager } = require("discord.js-lavalink"),
	  oneLine = require('common-tags').oneLine,
      { bot } = require('./config'),
      moment = require('moment'),
      dbaapi = require('discord-bots-api'),
      winston = require('winston'),
	  request = require('request'),
	  snekfetch = require('snekfetch'),
	  { MongoClient } = require('mongodb'),
	  MongoDBProvider = require('commando-provider-mongo'),
	  Jimp = require('jimp'),
	  fs = require('fs'),
      Discord = require('discord.js');

class SvOClient extends CommandoClient {
	constructor(options) {
		  super(options);
		  	this.config = require('./config');
		  	this.queue = new Map();
	}
}

global.client = new SvOClient({
	owner: bot.owner,
	commandPrefix: bot.prefix,
	unknownCommandResponse: false,
	disableEveryone: false,
	fetchAllMembers: true
});

global.lavaNodes = [
    { host: "localhost", port: 8080, region: "asia", password: "youshallnotpass" }
    //{ host: "185.120.5.230", port: 8080, region: "asia", password: "tr1serverkodzer"}
];

global.lavaManager = new PlayerManager(client, lavaNodes, {
    user: '288310817810546699',
    shards: '3'
});

dba = new dbaapi(client.config.dbotSites.botspwToken)

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	msg.react('😡');
	return true;
});

const log = msg => {
  logger.log('info', msg)
};

const logger = module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return `[${moment().format('YYYY-MM-DD HH:mm:ss')}] SHARD${client.shard.id + 1}`
      },
      colorize: 'all'
    })
  ]
});

client.on('guildCreate', async guild => {
    var guildhook = new Discord.WebhookClient(client.config.hooks.guildLogHook.id, client.config.hooks.guildLogHook.token)
    guildhook.send(`Shard ${client.shard.id + 1} > Yeni Sunucu > Sunucu Adı: "${guild.name}", Sunucu ID: "${guild.id}", Sunucu Sahibi: "${guild.owner}", Sunucu Sahibi ID "${guild.ownerID}" > ${client.guilds.size}. sunucu`)
		const girismesaj = [
		  '**Sohbet ve Oyun BOT sunucunuza eklendi!**',
		  '**Sohbet ve Oyun BOT** sunucunuzdaki insanlara ve size kolaylıklar sağlar.',
		  'Bot Serhan E. tarafından geliştirilmektedir (https://serhan.pw)',
		  'Botumuzun özelliklerini öğrenmek için svo!yardım komutunu kullanabilirsiniz.',
		  '',
		  `**Sohbet ve Oyun BOT Resmî Discord Sunucusu** https://discord.gg/GvfuXmE`
		]
		guild.owner.send(girismesaj)

		logger.log(`data`, `${guild.name} sunucusuna katıldım!`);
	})

	.on('guildDelete', async guild => {
		var guildhook = new Discord.WebhookClient(client.config.hooks.guildLogHook.id, client.config.hooks.guildLogHook.token)
		guildhook.send(`Shard ${client.shard.id + 1} > Atıldım! > Sunucu Adı: "${guild.name}", Sunucu ID: "${guild.id}", Sunucu Sahibi: "${guild.owner}", Sunucu Sahibi ID "${guild.ownerID}"`)
		logger.log(`data`, `${guild.name} sunucusundan atıldım!`);		
	})
	
	.on("guildMemberAdd", async member => {
		const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
		if (veri ==! true) return;
		if (veri === true) {
			const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
			let username = member.user.username;
			if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
			if (member.guild.channels.get(kanalveri).type === "text") {
				let randname = await randomString(16, 'aA');
				const bg = await Jimp.read("./guildAdd.png");
				const userimg = await Jimp.read(member.user.avatarURL);
				var font;
				if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
				else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
				else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
				await bg.print(font, 430, 170, member.user.tag);
				await userimg.resize(362, 362);
				await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
				  setTimeout(function () {
						member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
				  }, 1000);
				  setTimeout(function () {
					fs.unlink("./img/" + randname + ".png");
				  }, 10000);
			}
		}
	})

  .on("guildMemberRemove", async member => {
	const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
	if (veri ==! true) return;
	if (veri === true) {
		const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
		let username = member.user.username;
		if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
		if (member.guild.channels.get(kanalveri).type === "text") {
			let randname = await randomString(16, 'aA');
			const bg = await Jimp.read("./guildRemove.png");
			const userimg = await Jimp.read(member.user.avatarURL);
			var font;
			if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
			else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
			else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
			await bg.print(font, 430, 170, member.user.tag);
			await userimg.resize(362, 362);
			await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
			  setTimeout(function () {
					member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
			  }, 1000);
			  setTimeout(function () {
				fs.unlink("./img/" + randname + ".png");
			  }, 10000);
		}
	}
	})
	
	.on('guildMemberAdd', async member => {
		const veri = client.provider.get(member.guild.id, 'girisRolK', []);
		if (veri ==! true) return;
		if (veri === true) {
			const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
			if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
			member.addRole(girisrolveri);
		}
	})

	.on('message', async msg => {
	    if (!msg.guild) return;
	    const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
	    const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
	    if (veri ==! true) return;
	    if (veri === true) {
	        const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
	        if (swearWords.some(word => msg.content.includes(word))) {
	        	try {
		            if (!msg.member.hasPermission("BAN_MEMBERS")) {
		                msg.delete();

		                return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
		            }
	        	} catch(err) {
	        		console.log(err);
	        	}
	        }
	    }
	})

	/**
	 * antispam
	.on('message', async msg => {
		if (!msg.guild) return;
		if (msg.guild.id !== "360031789978484738") return;
		const talkedRecently = new Set();
		if (talkedRecently.has(msg.author.id)) {
			return msg.delete();
		};
		talkedRecently.add(msg.author.id);
		setTimeout(() => {
			talkedRecently.delete(msg.author.id);
		}, 1000);
	})*/

  .on('message', msg => {
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri !== true) return;
    if (veri === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		if (swearWords.some(word => msg.content.includes(word))) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				return;
			}
		}
		var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		if (regex.test(msg.content)==true) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				msg.delete();
				
				return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
			} else {
				return;
			};
		} else {
			return;
		};
    };
  })

	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!newMsg.guild) return;
		if (newMsg.author.bot) return;
		//ANTIREKLAM
		const antiadvariable = client.provider.get(newMsg.guild.id, 'reklamEngel', []);
		if (antiadvariable ==! true) return;
		if (antiadvariable === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
			if (swearWords.some(word => newMsg.content.toLowerCase().includes(word))) {
				if (!newMsg.member.hasPermission("ADMINISTRATOR")) {
					newMsg.delete();
					return newMsg.reply('Reklam yapmamalısın!').then(reply => reply.delete(3000));
				}
			}
		}
	})
	
	.on('ready', async () => {
		syncGuildCounts();
		setInterval(syncGuildCounts, 1800000);
		await client.user.setPresence({ game: { name: `svo!yenilikler | svo!yardım | svobot.com`, type: 0 } });
		logger.log(`info`, `Aktif, komutlar yüklendi!`);
		logger.log(`info`, `${client.user.username} ismi ile giriş yapıldı!`);
		client.user.setStatus('online');
	})
	
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', log)
	.on('disconnect', () => { logger.log('warn', 'Bağlantı koptu!'); })
	.on('reconnecting', () => { logger.log('warn', 'Yeniden bağlanılıyor...'); })
	.on('commandError', (cmd, err) => {
		if (err instanceof FriendlyError) return;
		logger.log(`error`, `Hata! ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		logger.log(`info`, oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		logger.log(`info`, oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		logger.log(`info`, oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		logger.log(`info`, oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	});

//LOG SYS

client
	.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye katıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3066993)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('guildMemberRemove', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye ayrıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('guildBanAdd', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});

		}
	})
	
	.on('guildBanRemove', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('messageDelete', async msg => {
		if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
			if (msg.author.bot) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen "${msg.content}" mesajı silindi.`)
			.setFooter(`ID: ${msg.id}`)
			msg.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('channelCreate', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})
		
	.on('channelDelete', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})

	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			const embed = new Discord.RichEmbed()
			.setColor(3066993)
			.setAuthor(oldMsg.author.tag, oldMsg.author.avatarURL)
			.setDescription(`${oldMsg.author} adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği "${oldMsg.content}" mesajını "${newMsg.content}" olarak düzenledi.`)
			.setFooter(`ID: ${oldMsg.id}`);
			oldMsg.guild.channels.get(logCh).send({embed});
		};
	});

process.on('unhandledRejection', (err) => {
	if (err.message && ['Missing Access', 'Missing Permissions'].some(x => err.message.includes(x))) return;
	logger.log('error', `${'[ERR]'.red} Unhandled rejection:\n${(err && err.stack) || err}`);
});

client.setProvider(
    MongoClient.connect('mongodb://localhost:27017').then(client => new MongoDBProvider(client, 'svobot'))
).catch(console.error);

client.registry
	.registerGroups([
		['eglence', 'Eğlence'],
		['bilgi', 'Bilgi'],
		['muzik', 'Müzik'],
		['moderasyon', 'Moderasyon'],
		['minecraft', 'Minecraft'],
		['util', 'Genel'],
		['ayarlar', 'Ayarlar'],
		['admin', 'Admin']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(bot.token);


async function syncGuildCounts() {
	postToDBL();
	client.shard.fetchClientValues('guilds.size').then(results => {
		dba.postStats('288310817810546699', results.reduce((prev, val) => prev + val, 0)).then((botData) => { logger.log('info', botData) })
		    const guildsizes = results.reduce((prev, val) => prev + val, 0)
		      snekfetch.post(`https://botlist.space/api/bots/288310817810546699`)
		      .set('Content-Type', 'application/json')
		      .set('Authorization', "ed593d43b82e869835fe8a04d58968d706c83314116d737c25dfdeb133d8386497a0a70aa368d9caf16bc2469236387a965a249ef93e1b9f243cdee24fc8d813")
		      .send({"server_count": guildsizes})
		      .then(() => console.log(`Botlist.space Stats updated.`))
		      .catch(err => console.error(err));
               request({
                   method: 'POST',
                   uri: `https://botsfordiscord.com/api/v1/bots/${client.user.id}`,
                   headers: {'Authorization':"2e287f1c36de63b9553efccc781ee822b915e1c5014ae285df0786fe3533ffb7a2b1a718f9821d156fe0a22edde79bc6459a25c5310dab4c44bee508b296b777"},
                   json: {"server_count" : guildsizes}
               });

	}).catch(console.error);
}

async function postToDBL() {
	request.post({
		url: `https://discordbots.org/api/bots/288310817810546699/stats`,
		form: {
			server_count: client.guilds.size,
			shard_id: client.shard.id,
			shard_count: client.shard.count
		},
		json: true,
		headers: {
			Authorization: client.config.dbotSites.DBLToken
		}
	})
	console.log('DBLye post gitti.')
}

async function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}