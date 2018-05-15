const commando = require('discord.js-commando');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'afk',
            aliases: ['afkol', 'afeke'],
            group: 'eglence',
            memberName: 'afk',
            description: 'AFK moduna geçersiniz.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

			args: [
				{
					key: 'neden',
					label: 'neden',
					prompt: 'Neden AFK oluyorsunuz?',
					type: 'string'
				}
			]
        });
    }

    async run(msg, args) {
		const neden = args.neden;
		const vt = this.client.provider.get(msg.author.id, 'afkStatus', []);
		const db = this.client.provider.get(msg.author.id, 'afkBefore', []);
		const db1 = this.client.provider.get(msg.author.id, 'afkGuild', []);
		if (vt !== true) {
			if (msg.member.nickname !== null) {
				this.client.provider.set(msg.author.id, 'afkReason', neden);
				this.client.provider.set(msg.author.id, 'afkBefore', msg.member.nickname);
				this.client.provider.set(msg.author.id, 'afkStatus', true);
				this.client.provider.set(msg.author.id, 'afkGuild', msg.guild.id);
				msg.member.setNickname('[AFK] ' + msg.member.nickname + '');
				return msg.channel.send(client.config.customEmojis.basarili + " Artık '" + neden + "' nedeni ile AFK'sınız");
			} else {
				this.client.provider.set(msg.author.id, 'afkReason', neden);
				this.client.provider.set(msg.author.id, 'afkBefore', msg.author.username);
				this.client.provider.set(msg.author.id, 'afkStatus', true);
				this.client.provider.set(msg.author.id, 'afkGuild', msg.guild.id);
				msg.member.setNickname('[AFK] ' + msg.author.username + '');
				return msg.channel.send(client.config.customEmojis.basarili + " Artık '" + neden + "' nedeni ile AFK'sınız");
			}
		} else {
			this.client.provider.set(msg.author.id, 'afkReason', "null");
			this.client.provider.set(msg.author.id, 'afkStatus', false);
			this.client.provider.set(msg.author.id, 'afkGuild', "null");
			msg.member.setNickname(db);
			return msg.reply('Tekrardan hoş geldiniz.');
		}
    }
};
