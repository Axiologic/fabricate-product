import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import Product from '../models/Product.js';
import DossierBuilder from "../services/DossierBuilder.js";
import Batch from "../models/Batch.js";
export default class productController extends ContainerController {
    constructor(element, history) {
        super(element);

        this.setModel({});
        this.model.product = new Product();

        let batches = localStorage.getItem("batches");
        if (!batches) {
            batches = [];
        } else {
            batches = JSON.parse(batches);
        }

        let options = [];
        batches.forEach(batch => options.push(new Batch(batch).generateViewModel()));
        this.model.batches = {
            label: "Batch",
            placeholder: "Select a batch",
            options: options
        };

        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("batch-selected", (event) => {
            let batch = batches.find(batch => batch.lotNumber === this.model.product.batch);
            this.model.expiration = batch.expiration;
        }, {capture: true});

        this.on("save-product", (event) => {
            let product = this.model.product;
            let validationResult = product.validate();
            if (Array.isArray(validationResult)) {
                for (let i = 0; i < validationResult.length; i++) {
                    let err = validationResult[i];
                    this.showError(err);
                }
                return;
            }
            this.buildDossier(product.serialID, "description.json", JSON.stringify(product), (err, seed) => {
                this.showError(err);
                let productHistory = localStorage.getItem("productHistory");
                if (!productHistory) {
                    productHistory = [];
                } else {
                    productHistory = JSON.parse(productHistory);
                }
                productHistory.unshift(seed);
                localStorage.setItem("productHistory", JSON.stringify(productHistory));
                history.push("?history");
            });
        });
    }

    buildDossier(seedKey, fileName, fileData, callback) {
        const dossierBuilder = new DossierBuilder();
        dossierBuilder.getTransactionId((err, transactionId) => {
            if (err) {
                return callback(err);
            }
            dossierBuilder.setSeedKey(transactionId, seedKey, (err) => {
                if (err) {
                    return callback(err);
                }
                dossierBuilder.addFileDataToDossier(transactionId, fileName, fileData, (err) => {
                    if (err) {
                        return callback(err);
                    }
                    dossierBuilder.buildDossier(transactionId, callback);
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
