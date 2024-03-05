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
                this.outputElement.innerHTML += msg + "\n";
            }
        });
    }

    setupDispatcher() {
        this.dispatcher.on("run", (e) => { this.run(e.code); });
    }

    async run(code) {
        this.dispatcher.spinning(this, true);

        if (!this.pyodide) await this.init();

        this.outputElement.innerHTML = "";
        this.pyodide.runPython(code);

        this.dispatcher.spinning(this, false);
    }
};
