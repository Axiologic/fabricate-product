import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

export default class productHistoryController extends ContainerController {
    constructor(element, history) {
        super(element);
        if(typeof history.location.state !== "undefined"){
            this.productIndex = history.location.state.productIndex;
        }
        let productHistory = JSON.parse(localStorage.getItem("productHistory"));
        const model = {};
        model.seed = productHistory[this.productIndex].seed;
        this.setModel(model);
    }
}
