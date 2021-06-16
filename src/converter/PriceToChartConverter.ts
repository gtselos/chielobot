const puppeteer = require('puppeteer');
const LightweightCharts = require('lightweight-charts');
import { IChartApi } from 'lightweight-charts';
import { HistoricalPriceCandleData } from '../domain/model/HistoricalPriceCandleData';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class PriceToChartConverter {

    static async createCandleStickChart(data: Array<HistoricalPriceCandleData>): Promise<string> {
        let content =
            `let data = ${JSON.stringify(data).replace(/_/g, '')};
             let dateFormatter = ${PriceToChartConverter.formatDate}
             let loadLightWeightChart = ${PriceToChartConverter.loadLightWeightChart.toString()}`;

        const browser = await puppeteer.launch({args: ['--no-sandbox'], dumpio: true});
        const page = await browser.newPage();
        const renderCode = PriceToChartConverter.getRenderCode(content);
        await page.setContent(renderCode);

        page.on('pageerror', function(err: Error) {
            throw new Error('Error: ' + err.toString());
          });

        await page.waitForSelector('#canvas');
        let element = await page.$('#canvas');
        let imageBase64 = await page.evaluate((element: HTMLElement) => element.textContent, element);

        let buf = Buffer.from(imageBase64.slice('data:image/png;base64,'.length), 'base64');

        let uuid: string = uuidv4();
        var dir = './tmp';
        let path: string = `${dir}/${uuid}.png`;

        if (!existsSync(dir)){
            mkdirSync(dir);
        }
        writeFileSync(path, buf);

        await browser.close();

        return path;
    }


    static loadLightWeightChart(
        element: string | HTMLElement,
        data: Array<HistoricalPriceCandleData>,
        dateFormatter: Function): IChartApi {
        var chart = LightweightCharts.createChart(element, {
            width: 800,
          height: 400,
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
                mode: LightweightCharts.CrosshairMode.Normal,
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
                time: dateFormatter(item.openTime),
                open: item.open.market,
                high: item.high.market,
                low: item.low.market,
                close: item.close.market,
            }))
        );
        return chart;
    }

    private static getRenderCode(content: string): string {
        return `
        <div id="chart"></div>
        <p id="canvas"></p>
        <script type="text/javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
        <script type="text/javascript">
            ${content}
            var chart = loadLightWeightChart('chart', data, dateFormatter);
            document.getElementById('canvas').innerHTML = chart.takeScreenshot().toDataURL();
        </script>
        `;
      }

    private static formatDate(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}