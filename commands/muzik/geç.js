const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class SkipCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'geç',
			aliases: ['gec', 'skip'],
			group: 'muzik',
			memberName: 'geç',
			description: 'Botun müziği geçmesini sağlar.',
			examples: ['geç'],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },
		});
	}
	
	async run(msg) {
		const voiceChannel = msg.member.voiceChannel;

		var embed = await prepareEmbed(msg, 'Kontrol ediliyor...');
		var message = await msg.channel.send({embed});

		var embed = await prepareEmbed(msg, 'Müzik dinleyebilmek için bir sesli kanalda olmalısın.');
		if (!voiceChannel) return message.edit({embed});
		
		const serverQueue = client.queue.get(msg.guild.id);

		var embed = await prepareEmbed(msg, 'Şarkı atlayabilmek için en az kuyrukta 2 şarkı olmalıdır.');
		if (serverQueue.songs.length < 2) return message.edit({embed});

		await serverQueue.songs.shift();
		const song = serverQueue.songs[0];
		serverQueue.player.play(song.track);
		var embed = await prepareEmbed(msg, 'Şarkı atlandı.');
		return message.edit({embed});
	}
};

async function prepareEmbed(msg, description, thumbnail) {
	var embed = new RichEmbed()
	.setTitle('Müzik')
	.setDescription(description)
	.setFooter(msg.author.tag + ' tarafından istendi.', msg.author.avatarURL)
	.setColor('RANDOM');

	if (thumbnail) embed.setThumbnail(thumbnail);

	return embed;
}