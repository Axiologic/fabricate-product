const crypto = require("pskcrypto");
export default class Product {
    productTypeSerialNumber;
    country;
    expirationDate;
    constructor(product) {
        if(typeof product !== undefined){
            for(let prop in product){
                this[prop] = product[prop];
            }
        }
        this.serialID = crypto.randomBytes(32);
    }

    validate(){
        const errors = [];
        if (!this.productTypeSerialNumber) {
            errors.push('Product type serial number is required.');
        }

        if (!this.country) {
            errors.push('Country is required.');
        }

        if (!this.expirationDate) {
            errors.push('Expiration date is required.');
        }

        return errors.length === 0 ? true : errors;
    }
}