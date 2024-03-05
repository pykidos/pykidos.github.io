import { Model } from "./model.js";
import { Dispatcher } from "./dispatcher.js";
import { State } from "./state.js";

import { Editor } from "./editor.js";
import { Grid } from "./grid.js";

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
        this.editor = new Editor(this.state, this.model, this.dispatcher);
        this.grid = new Grid(this.state, this.model, this.dispatcher);
    }

    init() {
        // Load the data.
        this.model.load().then(async () => {
            this.editor.init();
        });
    }
};
