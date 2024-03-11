import { HEADER, FOOTER, DEFAULT_INTERVAL } from "./constants.js";
import { getLang, getLocale, addLocale } from "./locale.js";
import { LOCALE } from "./locale.js";

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

        this.interval = DEFAULT_INTERVAL;

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
                this.outputElement.scrollTop = this.outputElement.scrollHeight;
            }
        });
    }

    setupDispatcher() {
        this.dispatcher.on("clear", (e) => { this.reset(); });
        this.dispatcher.on("run", (e) => { this.run(e.code); });
        this.dispatcher.on("stop", (e) => { this.stop(); });
        this.dispatcher.on("click", (e) => { this.click(e.row, e.col); });
        this.dispatcher.on("keyboard", (e) => { this.keyboard(e.key); });
    }

    getHeader() {
        // Replace all keys by themselves in the header constant.
        let header = HEADER(LOCALE);

        // Add locale aliases.
        let lang = getLang(); // TODO: take from code metadata instead
        let locale = getLocale(lang);

        header += "\n" + addLocale(locale);
        return header;
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
            this.outputElement.textContent = "";
        }

        let b = "\n\n";
        let fullCode = (
            addHeader ? this.getHeader() : '') +
            b + code + b +
            (addFooter ? this.getFooter() : '');
        let options = { "globals": this.globals };
        let out = null;

        try {
            out = await this.pyodide.runPython(fullCode, options);
            this.outputElement.classList.remove("error");
        }
        catch (error) {
            this.outputElement.textContent = error;
            this.outputElement.scrollTop = this.outputElement.scrollHeight;
            this.outputElement.classList.add("error");
            out = false;
        }

        // Parse the interval: use the localized variable name.
        // NOTE: use the code metadata instead.
        let interval = this.get('interval', getLang());
        if (interval) this.interval = interval;

        this.dispatcher.spinning(this, false);
        return out;
    }

    async frame(i) {
        if (!this.isPlaying) return;

        if (this.has("frame")) {
            let out = await this._run(`frame(${i})`, false, false, false);
            if (out != false)
                setTimeout(() => { this.frame(i + 1); }, this.interval * 1000);
        }
    }

    get(varName, lang = null) {
        if (lang) {
            // Use the localized name if a lang is provided.
            let locale = getLocale(getLang());
            varName = locale[varName];
        }
        return this.globals ? this.globals.toJs().get(varName) : null;
    }

    has(varName) {
        return this.globals && (this.get(varName) != null);
    }

    async run(code) {
        if (this.isPlaying) return;

        let out = await this._run(code);

        // If there is a "frame" function, call it for animation.
        if (this.has("frame")) {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.frame(0);
            }
        }

        return out;
    }

    stop() {
        this.isPlaying = false;
    }

    click(row, col) {
        if (this.has("click"))
            this._run(`click(${row}, ${col})`, false, false, false);
    }

    keyboard(key) {
        if (this.has("keyboard"))
            this._run(`keyboard("${key}")`, false, false, false);
    }
};
