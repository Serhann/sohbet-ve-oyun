const { Command } = require('discord.js-commando');

module.exports = class RebootCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reboot',
			aliases: ['yenidenbaşlat', 'restart'],
			group: 'admin',
			memberName: 'reboot',
			description: 'Botu yeniden başlatır.',
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		msg.reply(client.config.customEmojis.basarisiz + ' PM2 ile iletişim kurulamadı.')
	}
};
