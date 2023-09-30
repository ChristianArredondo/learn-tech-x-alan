import { IModelWithMongoId } from '../mongo/IModelWithMongoId';

export interface IEntityCommerceUser extends IModelWithMongoId {
    first_name: string;
    last_name: string;
    profile_url: string | null;
    address: {
        street_address: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
    };
}