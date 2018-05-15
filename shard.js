const Discord = require('discord.js');
const client = new Discord.Client();
const Manager = new Discord.ShardingManager('./bot.js');
Manager.spawn(3);

Manager.on('launch', function(shard) {
	console.log(`SHARD${shard.id}: Online.`);
});

const express = require('express');
const app = express();

app.get('/status', async (req, res) => {
  return res.end('OK');
});

app.listen(1000);