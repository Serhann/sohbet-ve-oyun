const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class DiscrimCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'discrim',
			aliases: ['discriminator', 'search-discrim'],
			group: 'eglence',
			memberName: 'discrim',
			description: 'Discrimleri aratır.',
			
			args: [
				{
					key: 'discrim',
					prompt: 'Bir discrim yazınız.',
					type: 'string',
					default: '',
					validate: discrim => {
						if (/^[0-9]+$/g.test(discrim) && discrim.length === 4 && discrim != "0000") return true;
						return 'Geçersiz discrim.';
					}
				}
			]
		});
	}

	run(msg, args) {
		const discrim = args.discrim || msg.author.discriminator;
        const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.tag);
        if (users < 1) {
            let embed = {
                color: 3447003,
                description: `${discrim} bulunamadı!`,
              };
            return msg.channel.send({embed});
        } else {
            let embed = {
                color: 3447003,
                description: `${users.join('\n ')}`,
              };
            return msg.channel.send({embed});
        }
	}
};
