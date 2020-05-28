function generateID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
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
        this.serialID = generateID(32);
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