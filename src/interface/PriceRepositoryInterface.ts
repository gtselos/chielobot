
interface PriceRepositoryInterface {

    getCurrentPriceByticker(tickerValues: string[] | undefined) : Object;

    getPricesByIntervalAndTicker(interval: string, tickerValues: string[] | undefined) : Object;

}