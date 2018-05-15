const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'giriş-rolü-ayarla',
			aliases: ['girişrolüayarla', 'girişrolü', 'giriş-rolü', 'girisrolu', 'girisrol', 'girişrol', 'girisroluayarla'],
			group: 'ayarlar',
			memberName: 'giriş-rolü-ayarla',
			description: 'Giriş rolünü belirlemenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'giriş rolü hangi rol olsun? (rol ismini yazınız)\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRol', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				msg.channel.send(`${client.config.customEmojis.basarisiz} Giriş rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				return msg.channel.send(`${client.config.customEmojis.basarili} Giriş rolü olarak ayarlanan rol: **${args.rol.name}**`);
			}
	}
};