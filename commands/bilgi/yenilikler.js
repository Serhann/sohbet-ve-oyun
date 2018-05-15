const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class NewsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yenilikler',
			aliases: [],
			group: 'bilgi',
			memberName: 'yenilikler',
			description: 'Bot ile ilgili yeni özellikleri gösterir.',
			guildOnly: false,
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	async run(msg) {
		if (msg.guild) {
			var embed = new RichEmbed()
			.setTitle('Yenilikler')
			.setDescription(stripIndents`
			**Sürüm 1.0.1**

			+ Hoş geldin mesajları resimli yapıldı. _kullanmak için \`svo!hoş-geldin\`_
			+ Triggered komutu eklendi.
			+ Rip komutu eklendi.
			+ Pixel komutu eklendi.
			+ Minecraft komutlarındaki buglar düzeltildi.
			+ Sitemiz **https://svobot.com** tekrardan online.

			Komutları görmek için \`${msg.guild.commandPrefix}yardım\`
			`)
			.setColor('RED');
			return msg.channel.send({embed});
		}

		var embed = new RichEmbed()
		.setTitle('Yenilikler')
		.setDescription(stripIndents`
		**Sürüm 1.0.1**

		+ Hoş geldin mesajları resimli yapıldı. _kullanmak için \`svo!hoş-geldin\`_
		+ Triggered komutu eklendi.
		+ Rip komutu eklendi.
		+ Pixel komutu eklendi.
		+ Minecraft komutlarındaki buglar düzeltildi.
		+ Sitemiz **https://svobot.com** tekrardan online.

		Komutları görmek için \`svo!yardım\`
		`)
		.setColor('RED');

		return msg.channel.send({embed});
	}
};
