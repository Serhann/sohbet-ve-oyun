const commando = require('discord.js-commando');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yazı-tura',
            aliases: ['yazıtura', 'yazitura', 'yazi-tura'],
            group: 'eglence',
            memberName: 'yazı-tura',
            description: 'Yazı tura atar.',
            guildOnly: false,
            throttling: {
                 usages: 2,
                 duration: 3
             }
        });
    }

    async run(msg) {
        function get_random(list) {
            return list[Math.floor((Math.random() * list.length))];
        };

        var yazitura = ["YAZI-TURA **|** Sonuç: **<:yazi:360439307997282304> (YAZI)** ","YAZI-TURA **|** Sonuç: **<:tura:360438827120328705> (TURA)**"];
        var sonuc = get_random(yazitura);
        msg.channel.send('Yazı tura atılıyor...').then(msg => {
            setTimeout(() => {
                msg.edit("<:yazi:360439307997282304>")
            }, 1000);
            setTimeout(() => {
                msg.edit("<:tura:360438827120328705>")
            }, 2000);
            setTimeout(() => {
                msg.edit("<:yazi:360439307997282304>")
            }, 3000);
            setTimeout(() => {
                msg.edit("<:tura:360438827120328705>")
            }, 4000);
            setTimeout(() => {
                msg.edit("<:yazi:360439307997282304>")
            }, 5000);
            setTimeout(() => {
                msg.edit("<:tura:360438827120328705>")
            }, 6000);
            setTimeout(() => {
                msg.edit("<:yazi:360439307997282304>")
            }, 7000);
            setTimeout(() => {
                msg.edit("<:tura:360438827120328705>")
            }, 8000);
            setTimeout(() => {
                msg.edit("<:yazi:360439307997282304>")
            }, 9000);
            setTimeout(() => {
                msg.edit(sonuc)
            }, 10000);
        });
    };
};
