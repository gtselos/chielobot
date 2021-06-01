import { HistoricalPriceData } from "domain/model/HistoricalPriceData";
import { Price } from "domain/valueObject/Price";

export interface PriceRepositoryInterface {

    getCurrentPriceByticker(tickerValues: string[] | undefined) : Promise<Price>;

    getPricesByIntervalAndTicker(interval: string, tickerValues: string[] | undefined) : Promise<HistoricalPriceData>;

}