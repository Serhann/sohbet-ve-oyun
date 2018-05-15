const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-rolü-kapat',
			aliases: ['girişrolükapat', 'girisrolukapat'],
			group: 'ayarlar',
			memberName: 'giriş-rolü-kapat',
			description: 'Giriş rolünü kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (db === true) {
				this.client.provider.set(msg.guild.id, 'girisRolK', false);
				msg.channel.send(`${client.config.customEmojis.basarili} Giriş rolü kapatıldı.`);
			} else {
				return msg.channel.send(`${client.config.customEmojis.basarisiz} Giriş rolü zaten kapalı.`);
			}
	}
};