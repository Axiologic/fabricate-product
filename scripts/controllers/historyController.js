import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

export default class historyController extends ContainerController {
    constructor(element, history) {
        super(element);
        let productHistory = JSON.parse(localStorage.getItem("productHistory"));
        const model = {seeds: []};
        productHistory.forEach(seed => model.seeds.push({seed: seed}));
        this.setModel(model);
    }
}
