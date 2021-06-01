import { PriceRepositoryInterface } from '../interface/PriceRepositoryInterface';
import { BinancePriceRepository } from '../implementation/BinancePriceRepository';

export class PriceRepositoryFactory {
    static instance() : PriceRepositoryInterface {
        return new BinancePriceRepository();
    }
}