import Utils from "./Utils.js";

export default class Package {
    productID;
    leaflet;
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
            errors.push('Product type ID is required.');
        }
        if (!this.leaflet) {
            errors.push('Leaflet is required.');
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