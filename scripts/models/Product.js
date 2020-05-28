const crypto = require("pskcrypto");
export default class Product {
    productID;
    country;
    expiration;
    constructor(product) {
        if(typeof product !== undefined){
            for(let prop in product){
                this[prop] = product[prop];
            }
        }
        this.serialID = crypto.randomBytes(32).toString("hex");
    }

    validate(){
        const errors = [];
        if (!this.productID) {
            errors.push('Product type serial number is required.');
        }

        if (!this.country) {
            errors.push('Country is required.');
        }

        if (!this.expiration) {
            errors.push('Expiration date is required.');
        }

        return errors.length === 0 ? true : errors;
    }
}