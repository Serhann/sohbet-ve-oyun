const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class MusicVolumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ses',
			aliases: ['s', 'volume', 'v', 'vol'],
			group: 'muzik',
			memberName: 'ses',
			description: 'Çalan müziğin ses seviyesini ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},
			
			args: [
                {
                    key: 'ses',
                    prompt: 'Ses seviyesini kaç yapmak istersiniz (0 ile 100 arasında bir sayı yazınız).',
                    type: 'integer'
                }
            ]
		});
	}

	async run(msg, args) {
		const serverQueue = client.queue.get(msg.guild.id);
		const voiceChannel = msg.member.voiceChannel;
		if (!serverQueue) return msg.reply('Şarkı çalmıyor..')
		if (!voiceChannel) return msg.reply('Ses seviyesini ayarlamak için öncelikle ses kanalına bağlanmalısın.');
		let vol = args.ses;
		if (vol < 0 || vol > 100) return msg.reply('Ses seviyesi **0** ile **100** arasında bir sayı olmalıdır.');
		serverQueue.volume = args.ses;
		serverQueue.player.volume(args.ses)
		msg.reply('Ses seviyesi **%' + vol + '** olarak ayarlandı.');
	}
};
