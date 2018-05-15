const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class MusicPauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dur',
			aliases: ['pause', 'durdur', 'paus'],
			group: 'muzik',
			memberName: 'dur',
			description: 'Çalan müziği durdurur.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg, client) {
		const voiceChannel = msg.member.voiceChannel;
		const serverQueue = this.client.queue.get(msg.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.player.pause(true);
			return msg.channel.send('⏸ Müzik durduruldu!');
		}
		return msg.channel.send('Müzik çalmıyor ki? Neyi durdurmamı istiyorsun??');
	}
};
