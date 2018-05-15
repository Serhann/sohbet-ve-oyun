const { Command } = require('discord.js-commando');

module.exports = class PreEnableCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'premium-deaktif',
			aliases: ['premiumdeaktif'],
			group: 'admin',
			memberName: 'premium-deaktif',
			description: 'Bir sunucu için premiumu deaktifleştirmeyi sağlar.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'guild',
					label: 'sunucu',
					prompt: 'lütfen sunucu id numarasını yazın.\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
	    const sunucu = args.guild;
	    if (this.client.guilds.has(sunucu)) {
    		const sunucuAdi = await this.client.guilds.get(sunucu).name;
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send(client.config.customEmojis.basarisiz + ' bu sunucu zaten premium bota sahip değil.');
    		var mesaj = await msg.channel.send('Deaktifleştiriliyor...');
    		this.client.provider.set(sunucu, 'preEnabled', false);
    		mesaj.edit('Deaktifleştirildi, bot sunucudan ayrılıyor...')
    		return this.client.guilds.get(sunucu).leave().then(() => mesaj.edit(`${client.config.customEmojis.basarili} Başarıyla ${sunucuAdi} sunucusunda premium deaktifleştirildi.`));
    	} else {
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send(client.config.customEmojis.basarisiz + ' bu sunucu zaten premium bota sahip değil.');
    	    var mesaj = await msg.channel.send('Bot sunucudan atılmış, premium deaktifleştiriliyor...');
    	    this.client.provider.set(sunucu, 'preEnabled', false);
    	    mesaj.edit(client.config.customEmojis.basarili + ' Deaktifleştirildi.');
    	}
	}
};