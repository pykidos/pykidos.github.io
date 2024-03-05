import { Model } from "./model.js";
import { Dispatcher } from "./dispatcher.js";
import { State } from "./state.js";

export { App };



/*************************************************************************************************/
/* App                                                                                           */
/*************************************************************************************************/

class App {
    constructor() {
        // Common objects.
        this.state = new State();
        this.model = new Model();
        this.dispatcher = new Dispatcher();

        // Components.
    }

    init() {
        // Load the data.
        this.model.load().then(async () => {
        });
    }
};
