const commando = require('discord.js-commando');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['pp', 'avatarbul'],
            group: 'eglence',
            memberName: 'avatar',
            description: 'İstediğiniz kullanıcının avatarının linkini verir.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimin avatarının linkini istersin?',
					type: 'member'
				}
			]
        });
    }

    async run(msg, args) {
      const member = args.member;
  		const user = member.user;
  		var embed = {
  			color: 3447003,
  			image: {
  				url: user.avatarURL,
  			}
  		};
  		msg.channel.send({embed});
    }
};
