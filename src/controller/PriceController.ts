const Discord = require('discord.js');
import { PriceRepositoryInterface } from 'interface/PriceRepositoryInterface';
import { PriceRepositoryFactory } from 'config/factories';
import { Price } from 'domain/valueObject/Price';

export class PriceController {

    static CURRENT_PRICE_COMMAND_REGEX = /^\$t\s+([^ ]+)\s+([^ ]+)/;

    static async getCurrentPrice(message: any): Promise<void> {
      let tickerValues: string[] | undefined =
        PriceController.CURRENT_PRICE_COMMAND_REGEX.exec(
          message.content)?.map((element: any) => element as string
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
}