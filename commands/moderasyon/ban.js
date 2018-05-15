const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationBanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			aliases: ['yasakla', 'sunucudan yasakla', 'banla', 'banhammer'],
			group: 'moderasyon',
			memberName: 'ban',
			description: 'İstediğiniz kişiyi sunucudan yasaklar.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi sunucudan yasaklamak istersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden bu kişiyi sunucudan yasaklamak istiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("BAN_MEMBERS")
	}

	async run(msg, args) {
		let guild = msg.guild;
		const member = args.member;
		const user = member.user;
		const reason = args.sebep;
		const kasa = this.client.provider.get(msg.guild.id, 'modKasa', []);
		const eskikasano = Number(kasa);
		const kasano = parseInt(eskikasano) + 1;
		this.client.provider.set(msg.guild.id, 'modKasa', kasano);
		const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
		const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
		if (db ==! "evet") return msg.channel.send(client.config.customEmojis.basarisiz + ' Lütfen `mod-log-ayarla` komutu ile mod-log kanalı belirleyiniz.');
		let modlog = vt;
		if (!modlog) return msg.channel.send(client.config.customEmojis.basarisiz + ' Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp `mod-log-ayarla` komutu ile mod-log olarak ayarlayınız.');

		if (!msg.guild.member(user).bannable) return msg.channel.send(client.config.customEmojis.basarisiz + ' Bu kişiyi sunucudan yasaklayamıyorum çünkü `benden daha yüksek bir role sahip` ya da `bana gerekli yetkileri vermedin`.');
		if (user.id === msg.author.id) return msg.say(client.config.customEmojis.basarisiz + ' Kendini banlayamazsın.')
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say(client.config.customEmojis.basarisiz + ' Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.');
		}
		member.send('**' + msg.guild.name + '** sunucusunda `' + msg.author.tag + '` adlı kişi/yetkili tarafından ___' + reason + '___ sebebi ile yasaklandın.')
		msg.guild.ban(user, 2);

		let embed = {
			color: 3447003,
			author: {
				name: `${msg.author.tag} (${msg.author.id})`,
				icon_url: msg.author.avatarURL
			},
			fields: [
				{
					name: "❯ Eylem:",
					value: "Sunucudan yasaklama",
					inline: false
				},
				{
					name: "❯ Kullanıcı:",
					value: `${user.tag} (${user.id})`,
					inline: false
				},
				{
					name: "❯ Yetkili:",
					value: `${msg.author.tag} (${msg.author.id})`,
					inline: false
				},
				{
					name: "❯ Sebep:",
					value: reason,
					inline: false
				}
			],
			timestamp: new Date(),
			footer: {
				text: `Sohbet ve Oyun | Kasa: ${kasano}`,
				icon_url: client.user.avatarURL
			},
			thumbnail: {
				url: user.avatarURL
			},
		};
		guild.channels.get(modlog).send({embed});
		return msg.channel.send(client.config.customEmojis.basarili + ' İşlem başarılı!');
	}
};
