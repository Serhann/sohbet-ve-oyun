const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'link-engelle',
			aliases: ['linkengelle', 'link-engel', 'linkleri-engelle'],
			group: 'ayarlar',
			memberName: 'link-engelle',
			description: 'Link engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'linkler engellensin mi? (evet ya da hayır olarak cevap yazınız)\n',
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
		return msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(msg.guild.id, 'linkEngel', []);
				this.client.provider.set(msg.guild.id, 'linkEngel', true);
				return msg.channel.send(`${client.config.customEmojis.basarili} Link engelleme özelliği: **açık**.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(msg.guild.id, 'linkEngel', []);
				this.client.provider.set(msg.guild.id, 'linkEngel', false);
				return msg.channel.send(`${client.config.customEmojis.basarili} Link engelleme özelliği: **kapalı**.`);
			}
	}
};