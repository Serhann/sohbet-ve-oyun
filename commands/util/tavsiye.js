const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const Discord = require('discord.js');
var hook = new Discord.WebhookClient(client.config.hooks.suggestHook.id, client.config.hooks.suggestHook.token);

module.exports = class SuggestionCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tavsiye',
			aliases: ['tavsiye bildir', 'tavsiye ediyorum', 'tavsiyebildir'],
			group: 'util',
			memberName: 'tavsiye',
			description: 'Bota eklenmesini istediğiniz şeyi tavsiye etmenizi sağlar.',
			examples: ['tavsiye <istek>'],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 120
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Ne tavsiye ediyorsunuz?',
                    type: 'string',
                    min: 1,
                    max: 1000
                }
            ]
		});
	}

	async run(msg, args) {
		const embed =  new Discord.RichEmbed()
        .setColor(3447003)
        .setDescription('**_' + msg.author.tag + '_ adlı kullanıcının tavsiyesi:**')
        .addField("❯ Kullanıcı bilgileri;", `✭ ID: ${msg.author.id}\n✭ Adı: ${msg.author.username}\n✭ Tagı: ${msg.author.discriminator}`)
        .addField('❯ Tavsiye;', `${args.msg}`)
        .setThumbnail(this.client.user.avatarURL);

        hook.send({ embeds: [embed] });
        msg.reply(client.config.customEmojis.basarili + ' Tavsiye bildirildi! Tavsiyenizi bildirdiğiniz için teşekkür ederiz!');
    }
};
