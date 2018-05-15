const { Command } = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');


module.exports = class RIPCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rip',
			aliases: ['ripbyrustavi'],
			group: 'eglence',
			memberName: 'rip',
			description: 'Birini rip eder xd',
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'user',
					prompt: 'Kimi rip edelim?',
					type: 'user',
					default: 'member'
				}
			]
		});
	}

	async run(msg, { user }) {
        let avatarURL;
        if (user === 'member') avatarURL = msg.author.avatarURL;
        else avatarURL = user.avatarURL;
		try {
			const base = await loadImage(path.join(__dirname, 'rip.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 158, 51, 200, 200);
			greyscale(ctx, 158, 51, 200, 200);
			return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'rip.png' }] });
		} catch (err) {
			return msg.reply(`Bir hata oluştu: \`${err.message}\`. Daha sonra tekrar dene!`);
		}
	}
};

function greyscale(ctx, x, y, width, height) {
    const data = ctx.getImageData(x, y, width, height);
    for (let i = 0; i < data.data.length; i += 4) {
        const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
        data.data[i] = brightness;
        data.data[i + 1] = brightness;
        data.data[i + 2] = brightness;
    }
    ctx.putImageData(data, x, y);
    return ctx;
}