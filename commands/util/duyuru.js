const commando = require('discord.js-commando');

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'duyuru',
            aliases: ['annouce', 'duyru', 'duyuruyap', 'anons', 'anonsyap'],
            group: 'util',
            memberName: 'duyuru',
            description: 'Sunucunuzda duyuru yapmanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'dbaslik',
                    label: 'duyuru başlığı',
                    prompt: 'Duyuru başlığını yazar mısınız?',
                    type: 'string',
                    min: 1,
                    max: 50
                },
                {
                    key: 'dmesaj',
                    label: 'duyuru mesajı',
                    prompt: 'Duyuru mesajını yazar mısınız?',
                    type: 'string',
                    min: 1,
                    max: 1000
                },
				{
					key: 'kanal',
					prompt: 'duyuru hangi kanala gönderilsin? (#kanalismi şeklinde yazınız)\n',
					type: 'channel',
				}
            ]
        });
    }

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

    async run(msg, args) {
        msg.guild.channels.get(args.kanal.id).send('@everyone').then(msg => msg.delete());
        let embed = {
            color: 3447003,
            title: `__**${args.dbaslik}**__`,
            description: `${args.dmesaj}`,
			timestamp: new Date(),
			footer: {
				text: `Sohbet ve Oyun | Duyuru`,
				icon_url: this.client.user.avatarURL
			},
            thumbnail: {
                url: msg.author.avatarURL || msg.client.user.avatarURL
  		    }
        };
        msg.guild.channels.get(args.kanal.id).send({embed});
        msg.channel.send(client.config.customEmojis.basarili + ' Duyuru başarılı bir şekilde gönderildi.');
    };
};
