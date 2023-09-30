import { IModelWithMongoId } from '../mongo/IModelWithMongoId';

export type TCurrency = 'USD';

export interface IEntityCommerceProduct extends IModelWithMongoId {
    name: string;
    price: number;
    currency: TCurrency;
}