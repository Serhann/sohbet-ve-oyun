const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class DogCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'köpek',
            aliases: ['random-dog', 'köpekpng', 'köpekjpg', '🐶'],
            group: 'eglence',
            memberName: 'köpek',
            description: 'Rastgele bir 🐶 resmi gönderir.',
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
				.get('https://random.dog/woof.json');
                let embed = {
                    color: 3447003,
                    description: `🐶`,
                    image: {
                        url: body.url,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`${client.config.customEmojis.basarisiz} Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
    };
};
