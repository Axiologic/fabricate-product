import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

export default class packagesController extends ContainerController {
    constructor(element, history) {
        super(element);
        let packageHistory = localStorage.getItem("packageHistory");
        console.log("Package history ===============", packageHistory);
        const model = {seeds: []};
        if (packageHistory) {
            packageHistory = JSON.parse(packageHistory);
            packageHistory.forEach(seed => model.seeds.push({seed: seed}));
        }

        console.log("Moooooooooooooooooooodel", model);
        this.setModel(model);
        this.on("create-package", () => {
            history.push("?create-package");
        });
    }
}
