import { User } from "src/user/models";
export declare class CreateCardPaymentMethodDTO {
    number: string;
    expirationDate: string;
    ownerName: string;
    fulnameFacturation: string;
    companyFacturation: string;
    countryFacturation: string;
    addressFacturation: string;
    cityFacturation: string;
    regionFacturation: string;
    postalCodeFacturation: string;
    phoneNumberFacturation: string;
    emailFacturation: string;
    owner: User;
}
