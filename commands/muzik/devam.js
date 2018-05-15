const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class MusicResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'devam',
			aliases: ['devamet', 'devamettir', 'başlat', 'resum', 'resume', 'unpause', 'unpaus'],
			group: 'muzik',
			memberName: 'devam',
			description: 'Duran müziği başlatır.',
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
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.player.pause(false);
			return msg.channel.send('▶ Müzik devam ettiriliyor!');
		}
		return msg.channel.send('Müzik çalmıyor ki? Neyi devam ettirmemi istiyorsun??');
	}
};
