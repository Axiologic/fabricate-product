export default class Batch {
    lotNumber;
    expiration;

    constructor(product) {
        if (typeof product !== undefined) {
            for (let prop in product) {
                this[prop] = product[prop];
            }
        }
    }

    generateViewModel() {
        return {label: this.lotNumber, value: this.lotNumber}
    }

    validate() {
        const errors = [];
        if (!this.lotNumber) {
            errors.push('Lot number is required.');
        }

        if (!this.expiration) {
            errors.push('Expiration date is required.');
        }

        return errors.length === 0 ? true : errors;
    }
}