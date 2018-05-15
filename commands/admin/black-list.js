const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist-user',
			aliases: ['blacklist'],
			group: 'admin',
			memberName: 'blacklist-user',
			description: 'Kullanıcıyı bottan banlamanızı sağlar.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'whom do you want to blacklist?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		if (this.client.isOwner(user.id)) return msg.reply(client.config.customEmojis.basarisiz + ' bot sahibi blackliste alınamaz.');

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return msg.reply(client.config.customEmojis.basarisiz + ' bu kişi zaten blacklistde bulunuyor.');

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return msg.reply(`${client.config.customEmojis.basarili} ${user.tag} bottan banlandı.`);
	}
};