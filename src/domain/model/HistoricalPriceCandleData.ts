import { Price } from '../valueObject/Price';

export class HistoricalPriceCandleData {
    private _openTime: Date;
    private _closeTime: Date;
    private _open: Price;
    private _close: Price;
    private _high: Price;
    private _low: Price;
    private _volume: number;

        
    constructor(
        openTime: Date,
        closeTime: Date,
        open: Price,
        close: Price,
        high: Price,
        low: Price,
        volume: number
    ) {
        this._openTime = openTime;
        this._closeTime = closeTime;
        this._open = open;
        this._close = close;
        this._high = high;
        this._low = low;
        this._volume = volume;
    };
    
    public get openTime(): Date {
        return this._openTime;
    }
    public set openTime(value: Date) {
        this._openTime = value;
    }
    public get closeTime(): Date {
        return this._closeTime;
    }
    public set closeTime(value: Date) {
        this._closeTime = value;
    }
    public get open(): Price {
        return this._open;
    }
    public set open(value: Price) {
        this._open = value;
    }
    public get close(): Price {
        return this._close;
    }
    public set close(value: Price) {
        this._close = value;
    }
    public get high(): Price {
        return this._high;
    }
    public set high(value: Price) {
        this._high = value;
    }
    public get low(): Price {
        return this._low;
    }
    public set low(value: Price) {
        this._low = value;
    }
    public get volume(): number {
        return this._volume;
    }
    public set volume(value: number) {
        this._volume = value;
    }

    public toString = (): string => {
        return `{
            openTime: ${this._openTime},
            closeTime: ${this._closeTime},
            open: ${this._open},
            close: ${this._close},
            high: ${this._high},
            low: ${this._low},
            volume: ${this._volume}}`
    }
}