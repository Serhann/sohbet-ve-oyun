const { Command } = require('discord.js-commando');
const { createCanvas, loadImage } = require('canvas');
const snekfetch = require('snekfetch');

module.exports = class PixelizeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pixel',
			group: 'eglence',
			memberName: 'pixel',
			description: 'Avatarınızı pixelleştirir.',
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to edit the avatar of?',
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
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(512, 512);
			const ctx = canvas.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(avatar, 0, 0, 512, 512);
			return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'pixel.png' }] });
		} catch (err) {
			return msg.reply(`Bir hata oluştu: \`${err.message}\`. Daha sonra tekrar dene!`);
		}
	}
};
