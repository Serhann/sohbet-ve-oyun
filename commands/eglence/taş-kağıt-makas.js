const commando = require('discord.js-commando');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'taş-kağıt-makas',
            aliases: ['taş', 'tas', 'kağıt', 'kagıt', 'kagit', 'kağit', 'makas', 'tkm', 'taskagitmakas', 'taskagıtmakas', 'taskağıtmakas', 'tas-kagıt-makas'],
            group: 'eglence',
            memberName: 'taş-kağıt-makas',
            description: 'Taş kağıt makas oynar.',
            guildOnly: false,
            throttling: {
                 usages: 2,
                 duration: 3
             }
        });
    }

    //<:makas:383865913583206400> <:tas:383865914086522890> <:kagit:383865913696583686>

    async run(msg) {
        function get_random(list) {
            return list[Math.floor((Math.random() * list.length))];
        };
            //<:tas:383865914086522890> <:kagit:383865913696583686> <:makas:383865913583206400>
        var yazitura = ["T-K-M **|** Sonuç: **<:tas:383865914086522890> (TAŞ)** ","T-K-M **|** Sonuç: **<:kagit:383865913696583686>** (KAĞIT)","T-K-M **|** Sonuç: **<:makas:383865913583206400>** (MAKAS)"] ;
        var sonuc = get_random(yazitura);
        msg.channel.send('3.. 2.. 1..').then(msg => {
            setTimeout(() => {
                msg.edit("<:tas:383865914086522890>")
            }, 1000);
            setTimeout(() => {
                msg.edit("<:kagit:383865913696583686>")
            }, 2000);
            setTimeout(() => {
                msg.edit("<:makas:383865913583206400>")
            }, 3000);
            setTimeout(() => {
                msg.edit("<:tas:383865914086522890>")
            }, 4000);
            setTimeout(() => {
                msg.edit("<:kagit:383865913696583686>")
            }, 5000);
            setTimeout(() => {
                msg.edit("<:makas:383865913583206400>")
            }, 6000);
            setTimeout(() => {
                msg.edit("<:tas:383865914086522890>")
            }, 7000);
            setTimeout(() => {
                msg.edit("<:kagit:383865913696583686>")
            }, 8000);
            setTimeout(() => {
                msg.edit("<:makas:383865913583206400>")
            }, 9000);
            setTimeout(() => {
                msg.edit(sonuc)
            }, 10000);
        });
    };
};
