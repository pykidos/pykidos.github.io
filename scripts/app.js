import { Model } from "./model.js";
import { Dispatcher } from "./dispatcher.js";
import { State } from "./state.js";

import { Spinner } from "./spinner.js";
import { Runner } from "./runner.js";
import { Grid } from "./grid.js";
import { Panel } from "./panel.js";
import { Keyboard } from "./keyboard.js";

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
        this.spinner = new Spinner(this.state, this.model, this.dispatcher);
        this.runner = new Runner(this.state, this.model, this.dispatcher);
        this.grid = new Grid(this.state, this.model, this.dispatcher);
        this.panel = new Panel(this.state, this.model, this.dispatcher);
        this.keyboard = new Keyboard(this.state, this.model, this.dispatcher);
    }

    init() {
        this.model.init().then(async () => {
        });
    }
};
