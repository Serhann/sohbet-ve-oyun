const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class CatCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kedi',
            aliases: ['random-cat', 'kedipng', 'kedijpg', '🐱'],
            group: 'eglence',
            memberName: 'kedi',
            description: 'Rastgele bir 🐱 resmi gönderir.',
            guildOnly: false,
            throttling: {
                 usages: 1,
                 duration: 5
            }
        });
    }

    async run(msg, args) {
		try {
			const { body } = await snekfetch
				.get('http://aws.random.cat/meow');
                let embed = {
                    color: 3447003,
                    description: `🐱`,
                    image: {
                        url: body.file,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`${client.config.customEmojis.basarisiz} Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };
};
