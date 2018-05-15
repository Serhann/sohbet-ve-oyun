const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reklam-engelle',
			aliases: ['reklamengel', 'reklam', 'reklamengelle', 'reklam-engelleme'],
			group: 'ayarlar',
			memberName: 'reklam-engelle',
			description: 'Reklam engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'reklamlar engellensin mi? (evet ya da hayır olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'lütfen `evet` ya da `hayır` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', true);
				return msg.channel.send(`${client.config.customEmojis.basarili} Reklam engelleme özelliği: **açık**.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', false);
				return msg.channel.send(`${client.config.customEmojis.basarili} Reklam engelleme özelliği: **kapalı**.`);
			}
	}
};