const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'log-kapat',
			aliases: ['logkapat', 'logkapa', 'logdevredışı', 'logskapa', 'logskapat'],
			group: 'ayarlar',
			memberName: 'log-kapat',
			description: 'Log kanalını kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const db = this.client.provider.get(msg.guild.id, 'logsEnable', []);
            if (db === false) return msg.reply('Loglar zaten devredışı bırakılmış.');
            else this.client.provider.set(msg.guild.id, 'logsEnable', false).then(() => msg.reply('Loglar devredışı bırakıldı.'));
	}
};