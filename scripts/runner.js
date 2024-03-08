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
        this.globals = null;
        this.isPlaying = false;
        this.outputElement = document.getElementById("terminal-output");

        this.setupDispatcher();
    }

    reset() {
        this.isPlaying = false;
        if (!this.pyodide) return
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
        this.dispatcher.on("stop", (e) => { this.stop(); });
    }

    getHeader() {
        return HEADER(LOCALE);
    }

    getFooter() {
        return FOOTER;
    }

    async _run(code, reset = true, addHeader = true, addFooter = true) {
        this.dispatcher.spinning(this, true);

        if (!this.pyodide) await this.init();

        if (reset) {
            this.reset();
            this.dispatcher.clear(this);
        }

        let b = "\n\n";
        let fullCode = (
            addHeader ? this.getHeader() : '') +
            b + code + b +
            (addFooter ? this.getFooter() : '');
        let options = { "globals": this.globals };
        let out = null;

        try {
            this.outputElement.textContent = "";
            out = await this.pyodide.runPython(fullCode, options);
            this.outputElement.classList.remove("error");
        }
        catch (error) {
            this.outputElement.textContent = error;
            this.outputElement.classList.add("error");
        }

        this.dispatcher.spinning(this, false);
        return out;
    }

    async frame(i) {
        if (!this.isPlaying) return;

        let out = await this._run(`frame(${i})`, false, false, false);
        if (out != false)
            setTimeout(() => { this.frame(i + 1); }, 100);
    }

    _hasFrame() {
        return this.globals && this.globals.toJs().get("frame");
    }

    async run(code) {
        // this.stop();
        // this.reset();
        // this.dispatcher.clear(this);
        if (this.isPlaying) return;

        // if (!this._hasFrame)
        await this._run(code);

        // If there is a "frame" function, call it for animation.
        if (this._hasFrame()) {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.frame(0);
            }
        }
        // Otherwise, normal run.
        else {
            return this._run(code);
        }
    }

    stop() {
        this.isPlaying = false;
    }
};
