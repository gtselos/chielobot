const Discord = require('discord.js');
import { PriceRepositoryInterface } from '../interface/PriceRepositoryInterface';
import { PriceRepositoryFactory } from '../config/factories';
import { Price } from '../domain/valueObject/Price';
import { HistoricalPriceCandleData } from '../domain/model/HistoricalPriceCandleData';
import { PriceToChartConverter } from '../converter/PriceToChartConverter';

export class PriceController {

    static CURRENT_PRICE_COMMAND_REGEX = /^\$t\s+([^ ]+)\s+([^ ]+)/;
    static HISTORICAL_PRICE_COMMAND_REGEX = /^\$t\s+([^ ]+)\s+([^ ]+)\s+(1m|3m|5m|15m|30m|1h|2h|4h|6h|8h|12h|1d|3d|1w|1M)/;

    static async getCurrentPrice(message: any): Promise<void> {
      let tickerValues: string[] | undefined =
        PriceController.CURRENT_PRICE_COMMAND_REGEX.exec(
          message.content)?.map((element: any) => element as string
        );
      if (tickerValues == undefined) {
        const errorMessage = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .addFields(
          { name: `Error`, value: 'Invalid Request'},
        )
        return;
      }
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
        message.channel.send(errorMessage);
      }
  
      if (priceData !== undefined) {
        const binanceTickerMessage = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .addFields(
          { name: `Binance ${priceData.ticker}`, value: priceData.market},
        )
        .setTimestamp();
  
        message.channel.send(binanceTickerMessage);
      }
    }

    static async getHistoricalPriceCandleData(message: any): Promise<void> {
      let functionParams: string[] | undefined =
        PriceController.CURRENT_PRICE_COMMAND_REGEX.exec(
          message.content)?.map((element: any) => element as string
      );
      if (functionParams == undefined) {
        const errorMessage = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .addFields(
          { name: `Error`, value: 'Invalid Request'},
        )
        return;
      }
      let priceRepository: PriceRepositoryInterface = PriceRepositoryFactory.instance();
      let priceData: Array<HistoricalPriceCandleData>;
      let image: string;
      try {
        priceData = await priceRepository.getPricesByIntervalAndTicker(
          functionParams[3],
          [functionParams[1],functionParams[2]],
        );
      } catch (error) {
        const errorMessage = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .addFields(
          { name: `Error`, value: error.response.data.msg},
        )
        message.channel.send(errorMessage);
        return;
      }
      image = PriceToChartConverter.createCandleStickChart(priceData);
      message.channel.send("Chart", {files: [image]});
    }
}