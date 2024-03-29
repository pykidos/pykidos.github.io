import { Model } from "./model.js";
import { Dispatcher } from "./dispatcher.js";
import { State } from "./state.js";

import { Keyboard } from "./keyboard.js";
import { Panel } from "./panel.js";
import { Runner } from "./runner.js";
import { Selector } from "./selector.js";
import { Spinner } from "./spinner.js";

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
        this.keyboard = new Keyboard(this.state, this.model, this.dispatcher);
        this.panel = new Panel(this.state, this.model, this.dispatcher);
        this.runner = new Runner(this.state, this.model, this.dispatcher);
        this.selector = new Selector(this.state, this.model, this.dispatcher);
        this.spinner = new Spinner(this.state, this.model, this.dispatcher);
    }

    init() {
        this.model.init().then(async () => {
            this.selector.init();
            await this.runner.init();
        });
    }
};
