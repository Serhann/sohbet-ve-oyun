const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hoş-geldin-ayarla',
			aliases: ['hoşgeldinayarla', 'hoşgeldin', 'hoş-geldin'],
			group: 'ayarlar',
			memberName: 'hoş-geldin-ayarla',
			description: 'Hoş geldin kanalını değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'hoş geldin kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
					type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'hosGeldin', []);
			const db = this.client.provider.get(msg.guild.id, 'hosGeldinK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(msg.guild.id, 'hosGeldinK', true);
				msg.channel.send(`${client.config.customEmojis.basarisiz} Hoş geldin kanalı zaten **${args.kanal.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'hosGeldin', args.kanal.id);
				this.client.provider.set(msg.guild.id, 'hosGeldinK', true);
				return msg.channel.send(`${client.config.customEmojis.basarili} Hoş geldin olarak ayarlanan kanal: **${args.kanal.name}**`);
			}
	}
};