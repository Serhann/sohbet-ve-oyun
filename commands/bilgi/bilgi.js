const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bilgi',
			aliases: ['b', 'info', 'bot info', 'botinfo'],
			group: 'bilgi',
			memberName: 'bilgi',
			description: 'Bot ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
		var embed = {
			color: 3447003,
			description: `**Bilgi**`,
			fields: [
				{
					name: '❯ Yapımcı',
					value: client.users.get('211566381592739851').tag,
					inline: false
				},
				{
					name: '❯ Sürüm',
					value: `${client.config.bot.version}`,
					inline: false
				},
				{
					name: '❯ Davet',
					value: `https://discordapp.com/oauth2/authorize?client_id=288310817810546699&scope=bot&permissions=401812495`,
					inline: false
				},
				{
					name: '❯ Destek sunucusu',
					value: `https://discord.gg/GvfuXmE`,
					inline: false
				},
			],
			footer: {
			  icon_url: this.client.user.avatarURL,
			  text: "© 2018 Sohbet ve Oyun"
			},
			thumbnail: { url: this.client.user.avatarURL }
    };
		return msg.channel.send({embed});
	}
};
