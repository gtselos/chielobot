import { HistoricalPriceCandleData } from "../domain/model/HistoricalPriceCandleData";
import { Price } from "../domain/valueObject/Price";

export interface PriceRepositoryInterface {

    getCurrentPriceByticker(tickerValues: string[]) : Promise<Price>;

    getPricesByIntervalAndTicker(
        interval: string,
        tickerValues: string[],
        startDate?: Date,
        endDate?: Date
        ): Promise<Array<HistoricalPriceCandleData>>;

}