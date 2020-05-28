function generateID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default class Product {
    productID;
    country;
    expiration;
    serialNumber;

    constructor(product) {
        if (typeof product !== undefined) {
            for (let prop in product) {
                this[prop] = product[prop];
            }
        }
        this.serialNumber = generateID(32);
    }

    validate() {
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