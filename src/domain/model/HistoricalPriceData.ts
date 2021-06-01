import { Price } from '../valueObject/Price';
export class HistoricalPriceData {
    private _price: Price;
    private _timestamp: Date;
        
    constructor(
        price: Price,
        timestamp: Date
    ) {
        this._price = price;
        this._timestamp = timestamp;
    };
    
    public get price(): Price {
        return this._price;
    }
    public set price(value: Price) {
        this._price = value;
    }

    public get timestamp(): Date {
        return this._timestamp;
    }
    public set timestamp(value: Date) {
        this._timestamp = value;
    }
}