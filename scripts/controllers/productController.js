import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import Product from './../models/product.js';
import DossierBuilder from "../services/DossierBuilder.js";

export default class productController extends ContainerController {
    constructor(element, history) {
        super(element);

        this.setModel(new Product());

        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("save-product", (event) => {
            let product = this.model;
            let validationResult = product.validate();
            if (Array.isArray(validationResult)) {
                for (let i = 0; i < validationResult.length; i++) {
                    let err = validationResult[i];
                    this.showError(err);
                }
                return;
            }

            this.buildDossier(product.serialID, "description.json", JSON.stringify(product));
        });
    }

    buildDossier(seedKey, fileName, fileData) {
        const dossierBuilder = new DossierBuilder();
        dossierBuilder.getTransactionId((err, transactionId) => {
            this.showError(err);
            dossierBuilder.setSeedKey(transactionId, seedKey, (err) => {
                this.showError(err);

                dossierBuilder.addFileDataToDossier(transactionId, fileName, fileData, (err) => {
                    this.showError(err);
                    dossierBuilder.buildDossier(transactionId, (err, seed) => {
                        this.showError(err);
                    });
                })
            })
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
