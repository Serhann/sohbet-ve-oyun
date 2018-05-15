const Canvas = require('canvas');
const { Command } = require('discord.js-commando');
const path = require('path');

module.exports = class PleaseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lütfen',
			aliases: ['pls', 'please'],
			group: 'eglence',
			memberName: 'lütfen',
			description: 'Lütfen..',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'member',
					label: 'üye',
					prompt: 'kimi lütfenlemek istersin?\n',
					type: 'member'
				}
			]
		});
	}

	run(msg, args) {
		const member = args.member.displayName;

		const canvas = new Canvas();
		const ctx = canvas.getContext('2d');
		const { width, height } = this.textSizes(ctx, member);

		canvas.width = width < 130 ? 130 : width;
		canvas.height = height;

		const generate = () => {
			ctx.font = '700 32px Roboto';
			ctx.fillStyle = '#B93F2C';
			ctx.textAlign = 'center';
			ctx.fillText(member, canvas.width / 2, 35);

			ctx.fillStyle = '#F01111';
			ctx.fillText('Lütfen', canvas.width / 2, 70);
		};
		generate();

		return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'please.png' }] });
	}

	textSizes(ctx, text) {
		ctx.font = '700 32px Arial';
		const dimensions = ctx.measureText(text);
		const sizes = {
			width: dimensions.width + 20,
			height: dimensions.emHeightAscent + 54
		};
		if (dimensions.actualBoundingBoxDescent) sizes.height += dimensions.actualBoundingBoxDescent - 3;

		return sizes;
	}
};