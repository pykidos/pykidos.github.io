import { HEADER, FOOTER } from "./constants.js";

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

    async init() {
        this.pyodide = await loadPyodide();
        this.pyodide.setStdout({
            batched: (msg) => {
                this.outputElement.textContent += msg + "\n";
            }
        });
    }

    setupDispatcher() {
        this.dispatcher.on("run", (e) => { this.run(e.code); });
    }

    getHeader() {
        return HEADER;
    }

    getFooter() {
        return FOOTER;
    }

    async run(code) {
        this.dispatcher.spinning(this, true);

        if (!this.pyodide) await this.init();

        let b = "\n\n";
        let fullCode = this.getHeader() + b + code + b + this.getFooter();

        try {
            this.outputElement.textContent = "";
            this.pyodide.runPython(fullCode);
            this.outputElement.classList.remove("error");
        }
        catch (error) {
            this.outputElement.textContent = error;
            this.outputElement.classList.add("error");
        }

        this.dispatcher.spinning(this, false);
    }
};
