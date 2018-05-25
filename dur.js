const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class MusicStopCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dur',
			aliases: ['stop', 'kapat', 'dur'],
			group: 'muzik',
			memberName: 'dur',
			description: 'Çalan müziği kapatır.',
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
			serverQueue.player.stop(true);
			return
		}
		return msg.channel.send('Şu anda çalmakta olan müzik yok.');
	}
};
