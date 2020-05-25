import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import Product from './../models/product.js';

export default class productController extends ContainerController {
    constructor(element, history) {
        super(element);

        this.DSUStorage.getItem("/data/product.json",  "json", (err, product)=>{
            if(err){
                product = new Product();
            }else{
                product = new Product(product);
            }

            this.setModel(product);
        });

        this.on("save-product", (event)=>{
            let product = this.model;
            let validationResult = product.validate();
            if(Array.isArray(validationResult)){
                for(let i = 0; i<validationResult.length; i++){
                    let err = validationResult[i];
                    this.showError(err);
                }
                return;
            }

            this.DSUStorage.setItem('/data/product.json', JSON.stringify(product), (err)=>{
                if(err){
                    this.showError(err, "Product update failed.");
                    return;
                }
                history.push("/home");
            });
        });
    }

    showError(err, title, type) {
        let errMessage;
        title = title ? title : 'Validation Error';
        type = type ? type : 'alert-danger';

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === 'object') {
            errMessage = err.toString();
        } else {
            errMessage = err;
        }
        this.feedbackEmitter(errMessage, title, type);
    }
}