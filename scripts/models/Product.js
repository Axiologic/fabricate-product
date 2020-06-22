import Utils from "./Utils.js";

export default class Product {
    productID;
    country;
    batch;
    serialNumber;

    constructor(product) {
        if (typeof product !== undefined) {
            for (let prop in product) {
                this[prop] = product[prop];
            }
        }
        this.serialNumber = Utils.generateID(32);
    }

    validate() {
        const errors = [];
        if (!this.productID) {
            errors.push('Product type serial number is required.');
        }

        if (!this.country) {
            errors.push('Country is required.');
        }

        if (!this.batch) {
            errors.push('Batch is required.');
        }

        return errors.length === 0 ? true : errors;
    }
}