const fs = require('fs');
import { createChart, CrosshairMode } from 'lightweight-charts';
import { HistoricalPriceCandleData } from '../domain/model/HistoricalPriceCandleData';
import { v4 as uuidv4 } from 'uuid';

export class PriceToChartConverter {

    static createCandleStickChart(data: Array<HistoricalPriceCandleData>): string {
        var chart = createChart(document.body, {
            width: 600,
          height: 300,
            layout: {
                backgroundColor: '#000000',
                textColor: 'rgba(255, 255, 255, 0.9)',
            },
            grid: {
                vertLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
                horzLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 0.8)',
            },
        });

        var candleSeries = chart.addCandlestickSeries({
            upColor: 'rgba(255, 144, 0, 1)',
            downColor: '#000',
            borderDownColor: 'rgba(255, 144, 0, 1)',
            borderUpColor: 'rgba(255, 144, 0, 1)',
            wickDownColor: 'rgba(255, 144, 0, 1)',
            wickUpColor: 'rgba(255, 144, 0, 1)',
          });

          candleSeries.setData(
            data.map(item => ({
                time: item.openTime.toDateString(),
                open: item.open.market,
                high: item.high.market,
                low: item.low.market,
                close: item.close.market,
            }))
          );
        
        let imgData: string = chart.takeScreenshot().toDataURL("image/png");
        let uuid: string = uuidv4();
        let path: string = `tmp/${uuid}.png`

        // Or
        fs.writeFileSync(path, imgData);

        return path;
    }
}