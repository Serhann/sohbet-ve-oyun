const commando  = require('discord.js-commando');
const Discord   = require("discord.js");
//const Cleverbot = require('cleverbot-node');
//const clbot     = new Cleverbot;

module.exports = class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sor',
            aliases: ['ask', 'botla konuş', 'konuş'],
            group: 'eglence',
            memberName: 'sor',
            description: 'Bota soru sormanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Bana ne sormak istersin?',
                    type: 'string',
                    min: 1,
                    max: 1000,
                    default: ''
                }
            ]
        });
    }

    async run(msg, args) {
        const soru = args.msg;
        if (soru === "yapimcin kim" || soru === "yapimcin kim?" || soru === "yapımcın kim" || soru === "yapımcın kim?") {
            msg.channel.startTyping();
              setTimeout(() => {
                   msg.channel.send('🗨 **Yapay zeka:** Yapımcım: A Black Monday / Serhan#7171');
                   msg.channel.stopTyping();
              }, Math.random() * (1 - 3) + 1 * 1000);
              return;
        }
  		return msg.channel.send(client.config.customEmojis.basarisiz + ' Komut kısa süreliğine devre dışıdır.');
  		Cleverbot.prepare(() => {
  		  clbot.write(soru, (response) => {
  			msg.channel.startTyping();
  			setTimeout(() => {
  			  msg.channel.send('🗨 **Yapay zeka:** ' + response.msg).catch(console.error);
  			  msg.channel.stopTyping();
  			}, Math.random() * (1 - 3) + 1 * 1000);
  		  });
  		});
	};
};
