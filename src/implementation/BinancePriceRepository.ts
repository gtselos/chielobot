import axios from "axios";
import { HistoricalPriceCandleData } from "../domain/model/HistoricalPriceCandleData";
import { Price } from "../domain/valueObject/Price";
import { PriceRepositoryInterface } from "../interface/PriceRepositoryInterface";

export class BinancePriceRepository implements PriceRepositoryInterface {

    async getCurrentPriceByticker(tickerValues: string[]): Promise<Price> {
      let priceData = await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${tickerValues[1].toUpperCase()}${tickerValues[2].toUpperCase()}`
      );
      return new Price(priceData.data.symbol, priceData.data.price);
    }

    async getPricesByIntervalAndTicker(
      interval: string,
      tickerValues: string[],
      startDate?: Date,
      endDate?: Date): Promise<Array<HistoricalPriceCandleData>> {
        let symbol = `${tickerValues[0].toUpperCase()}${tickerValues[1].toUpperCase()}`;
        let dateQuery: string = '';
        if (startDate != undefined && endDate != undefined) {
          let startTime = `startTime=${Math.round(startDate.getTime() / 1000).toString()}`;
          let endTime = `endtime=${Math.round(endDate.getTime() / 1000).toString()}`;
          dateQuery = `${startTime}&${endTime}`;
        }
        let priceData = await axios.get<any[]>(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}${dateQuery}`
        );
        return priceData.data.map(
          (priceDataElement) => new HistoricalPriceCandleData(
            new Date(priceDataElement[0]),
            new Date(priceDataElement[6]),
            new Price(symbol, priceDataElement[1]),
            new Price(symbol, priceDataElement[4]),
            new Price(symbol, priceDataElement[2]),
            new Price(symbol, priceDataElement[3]),
            priceDataElement[5],
          )
        );
    }    

}