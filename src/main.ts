require('dotenv').config();
const Discord     = require('discord.js');
const client      = new Discord.Client();

import { HelpController } from './controller/HelpController';
import { PriceController } from './controller/PriceController';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg: any) => {
  if (HelpController.HELP_COMMAND_REGEX.test(msg.content)) {
    HelpController.sendMessage(msg);
  }
  if (PriceController.CURRENT_PRICE_COMMAND_REGEX.test(msg.content)) {
    PriceController.getCurrentPrice(msg);
  }
  if (PriceController.HISTORICAL_PRICE_COMMAND_REGEX.test(msg.content)) {
    PriceController.getHistoricalPriceCandleData(msg);
  }
});

client.login(process.env.TOKEN);