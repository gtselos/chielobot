export class Price {
    private _ticker: string;
    private _market: number;
    private _bid?: number | undefined;
    private _ask?: number | undefined;

    constructor(
        ticker: string,
        market: number,
        bid?: number,
        ask?: number) {
        this._ticker = ticker;
        this._market = market;
        this._bid = bid;
        this._ask = ask;
    }

    public get ticker(): string {
        return this._ticker;
    }
    public set ticker(value: string) {
        this._ticker = value;
    }
    
    public get market(): number {
        return this._market;
    }
    public set market(value: number) {
        this._market = value;
    }
    
    public get bid(): number | undefined {
        return this._bid;
    }
    public set bid(value: number | undefined) {
        this._bid = value;
    }
    
    public get ask(): number | undefined {
        return this._ask;
    }
    public set ask(value: number | undefined) {
        this._ask = value;
    }

    public toString = (): string => {
        return `{
            ticker: ${this._ticker},
            market: ${this._market}
            ${this._bid === undefined ? '' : `, bid: ${this._bid},`}
            ${this._ask === undefined ? '' : `ask: ${this._ask},`}}`
    }
}