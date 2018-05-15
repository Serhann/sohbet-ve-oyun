const stripIndents = require('common-tags').stripIndents;
const { Command, util } = require('discord.js-commando');
const PAGINATED_ITEMS = 5;
const { RichEmbed } = require('discord.js');

module.exports = class LeaveCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kuyruk',
			aliases: [],
			group: 'muzik',
			memberName: 'kuyruk',
			description: 'Kuyruktaki müzikleri listeler.',
			examples: [],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
			 },

			 args: [{
                key: "page",
                prompt: "sayfa?\n",
                type: "integer",
                default: 1
            }]
		});
	}
	
	async run(msg, { page }) {
		const voiceChannel = msg.member.voiceChannel ? msg.member.voiceChannel : (msg.guild.voiceConnection ? msg.guild.voiceConnection.channel : null)
		const serverQueue  = client.queue.get(msg.guild.id);
		if (!serverQueue) return msg.reply('krdş kuyrukda şarkı yok ki neyin kuyruğunu görecen sen?')
        const paginated = util.paginate(serverQueue.songs, page, Math.floor(PAGINATED_ITEMS));
        const totalLength = serverQueue.songs.reduce((prev, song) => prev + song.time, 0);
        const currentSong = serverQueue.songs[0];
        const embed = new RichEmbed()
            .setColor('RANDOM')
			.setTitle(`Müzik`)
			.setFooter(msg.author.tag + ' tarafından istendi.', msg.author.avatarURL)
            .setTimestamp()
            .setDescription(`__**Sayfa ${paginated.page}**__
${paginated.items.map(song => `**-** ${!isNaN(song.id) ? `${song.name}` : `[${song.title}](${song.url})`}`).join("\n")}
**Çalan:** ${!isNaN(currentSong.id) ? `${currentSong.title}` : `[${currentSong.title}](${currentSong.url})`}
			`);
        return msg.embed(embed);
	}
};
