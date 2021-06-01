require('dotenv').config();
const Discord     = require('discord.js');
const axios       = require('axios');
const client      = new Discord.Client();
const BINANCE_CURRENT_REGEXP = /^\$t\s+([^ ]+)\s+([^ ]+)/;

import { createChart } from 'lightweight-charts';
import { PriceRepositoryInterface } from 'interface/PriceRepositoryInterface';
import { PriceRepositoryFactory } from 'config/factories';
import { Price } from 'domain/valueObject/Price';
import { HelpController } from 'controller/HelpController';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg: any) => {
  if (HelpController.HELP_COMMAND_REGEX.test(msg.content)) {
    HelpController.sendMessage(msg.channel);
  }
  if (BINANCE_COMMAND_REGEXP.test(msg.content)) {
    let tickerValues: string[] | undefined = BINANCE_COMMAND_REGEXP.exec(
      msg.content)?.map(element => element as string
    );
    let priceRepository: PriceRepositoryInterface = PriceRepositoryFactory.instance();
    let priceData: Price | undefined;
    try {
      priceData = await priceRepository.getCurrentPriceByticker(tickerValues);
    } catch (error) {
      const errorMessage = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .addFields(
        { name: `Error`, value: error.response.data.msg},
      )
      msg.channel.send(errorMessage);
    }

    if (priceData !== undefined) {
      const binanceTickerMessage = new Discord.MessageEmbed()
      .setColor('#FFFF00')
      .addFields(
        { name: `Binance ${priceData.ticker}`, value: priceData.market},
      )
      .setTimestamp();

      msg.channel.send(binanceTickerMessage);
    }
  }
});

client.login(process.env.TOKEN);