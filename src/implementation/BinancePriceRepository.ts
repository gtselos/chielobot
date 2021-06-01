import axios from "axios";
import { HistoricalPriceData } from "domain/model/HistoricalPriceData";
import { Price } from "domain/valueObject/Price";
import { PriceRepositoryInterface } from "interface/PriceRepositoryInterface";

export class BinancePriceRepository implements PriceRepositoryInterface {

    async getCurrentPriceByticker(tickerValues: string[] | undefined): Promise<Price> {
        if (tickerValues == undefined) {
            throw Error();
          }
          let priceData = await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${tickerValues[1].toUpperCase()}${tickerValues[2].toUpperCase()}`
          );
          return new Price(priceData.data.symbol, priceData.data.price);
    }
    getPricesByIntervalAndTicker(interval: string, tickerValues: string[] | undefined): Promise<HistoricalPriceData> {
        throw new Error("Method not implemented.");
    }

}