import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import Batch from "../models/Batch.js";

export default class addBatchController extends ContainerController {
    constructor(element, history) {
        super(element);
        let batch = new Batch();
        this.setModel(batch);
        this.on("add-batch", () => {
            let batches = localStorage.getItem("batches");
            if (!batches) {
                batches = [];
            } else {
                batches = JSON.parse(batches);
            }

            batches.push(batch);
            localStorage.setItem("batches", JSON.stringify(batches));
        });
    }
};