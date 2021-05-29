require('dotenv').config();
const Discord     = require('discord.js');
const axios       = require('axios');
const client      = new Discord.Client();
const BINANCE_CURRENT_REGEXP = /^\$t\s+([^ ]+)\s+([^ ]+)/;

import { createChart } from 'lightweight-charts';

async function getCurrentBinancePriceByticker(tickerValues: string[] | undefined) {
  if (tickerValues == undefined) {
    throw Error();
  }
  return await axios.get(
    `https://api.binance.com/api/v3/ticker/price?symbol=${tickerValues[1].toUpperCase()}${tickerValues[2].toUpperCase()}`
  );
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg: any) => {
  if (msg.content == '$chielobot help') {
    const usageMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Chielobot commands')
    .addField('\u200b', '\u200b')
    .addFields(
      { name: 'Get binance ticker price', value: '$t {Ticker symbol 1} {Ticker 2}'},
      { name: 'example', value: '$binance BTC USDT'},
    )
    msg.channel.send(usageMessage);
  }
  if (BINANCE_COMMAND_REGEXP.test(msg.content)) {
    let tickerValues: string[] | undefined = BINANCE_COMMAND_REGEXP.exec(
      msg.content)?.map(element => element as string
    );
    let priceData;
    try {
      priceData = await getCurrentBinancePriceByticker(tickerValues);
    } catch (error) {
      const errorMessage = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .addFields(
        { name: `Error`, value: error.response.data.msg},
      )
      msg.channel.send(errorMessage);
    }

    const binanceTickerMessage = new Discord.MessageEmbed()
    .setColor('#FFFF00')
    .addFields(
      { name: `Binance ${priceData.data.symbol}`, value: priceData.data.price},
    )
    .setTimestamp();

    msg.channel.send(binanceTickerMessage);
  }
});

client.login(process.env.TOKEN);