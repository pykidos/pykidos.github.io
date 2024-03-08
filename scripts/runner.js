import { HEADER, FOOTER } from "./constants.js";
import { LOCALE } from "./i18.js";

export { Runner };


/*************************************************************************************************/
/* Runner                                                                                        */
/*************************************************************************************************/

class Runner {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.pyodide = null;
        this.outputElement = document.getElementById("terminal-output");

        this.setupDispatcher();
    }

    reset() {
        this.globals = this.pyodide.toPy({});
    }

    async init() {
        this.pyodide = await loadPyodide();
        this.reset();
        this.pyodide.setStdout({
            batched: (msg) => {
                this.outputElement.textContent += msg + "\n";
            }
        });
    }

    setupDispatcher() {
        this.dispatcher.on("clear", (e) => { this.reset(); });
        this.dispatcher.on("run", (e) => { this.run(e.code); });
    }

    getHeader() {
        return HEADER(LOCALE);
    }

    getFooter() {
        return FOOTER;
    }

    async run(code) {
        this.dispatcher.spinning(this, true);

        if (!this.pyodide) await this.init();

        this.reset();
        this.dispatcher.clear(this);

        let b = "\n\n";
        let fullCode = this.getHeader() + b + code + b + this.getFooter();
        let options = { "globals": this.globals };

        try {
            this.outputElement.textContent = "";
            this.pyodide.runPython(fullCode, options);
            this.outputElement.classList.remove("error");
        }
        catch (error) {
            this.outputElement.textContent = error;
            this.outputElement.classList.add("error");
        }

        this.dispatcher.spinning(this, false);
    }

    async play(code) {
        this.run(code);
    }
};
