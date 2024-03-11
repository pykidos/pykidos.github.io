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

    async init() {
        this.pyodide = await loadPyodide();
        this.reset();
        this.pyodide.setStdout({
            batched: (text) => {
                this.stdout(text);
            }
        });
    }

    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupDispatcher() {
        this.dispatcher.on("run", (e) => { this.run(e.code); });
        this.dispatcher.on("click", (e) => { this.click(e.row, e.col); });
        this.dispatcher.on("keyboard", (e) => { this.keyboard(e.key); });

        // this.dispatcher.on("clear", (e) => { this.reset(); });
        // this.dispatcher.on("stop", (e) => { this.stop(); });
    }

    /* Output functions                                                                          */
    /*********************************************************************************************/

    clearOutput() {
        this.outputElement.textContent = "";
        this.outputElement.classList.remove("error");
    }

    scrollOutput() {
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }

    stdout(text) {
        if (text)
            this.outputElement.textContent += text + "\n";
        this.outputElement.classList.remove("error");
        this.scrollOutput();
    }

    stderr(text) {
        this.outputElement.textContent = text;
        this.outputElement.classList.add("error");
        this.scrollOutput();
    }

    /* Internal functions                                                                        */
    /*********************************************************************************************/

    async _run(code, reset = true, addHeader = true, addFooter = true) {
        // Start the spinning cursor.
        this.dispatcher.spinning(this, true);

        // Lazily initialize the pyodide engine.
        if (!this.pyodide) await this.init();

        if (reset) {
            this.reset();
        }

        // Construct the code.
        let fullCode = this.makeCode(code, addHeader, addFooter);
        let out = false;

        // Try running the code and update the output.
        try {
            let options = { "globals": this.globals };
            out = await this.pyodide.runPython(fullCode, options);
            this.stdout();
        }
        catch (error) {
            this.stderr(error);
        }

        // Parse the interval: use the localized variable name.
        // NOTE: use the code metadata instead.
        let interval = this.get('interval', getLang());
        if (interval)
            this.interval = interval;

        // Stop the spinning cursor.
        this.dispatcher.spinning(this, false);
        return out;
    }

    /* Code construction                                                                         */
    /*********************************************************************************************/

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

    makeCode(code, addHeader = true, addFooter = true) {
        let b = "\n\n";
        return (
            addHeader ? this.getHeader() : '') +
            b + code + b +
            (addFooter ? this.getFooter() : '');
    }

    /* Context                                                                                   */
    /*********************************************************************************************/

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

    /* Runner                                                                                    */
    /*********************************************************************************************/

    reset() {
        // Stop and clear both the global variables and the grid.
        this.isPlaying = false;
        if (!this.pyodide) return;

        // Clear the global variables.
        this.globals = this.pyodide.toPy({});

        // Clear the standard output.
        this.stdout();

        // Emit the clear event, which will clear the grid.
        this.dispatcher.clear(this);
    }

    async run(code) {
        // Save the code in the storage.
        this.model.storage.save(this.state.name, code);

        // If is playing, stop.
        if (this.isPlaying) {
            return this.stop();
        }

        // If not playing, run the code.
        else {
            return this.start(code);
        }
    }

    async start(code) {
        // Run the code.
        let out = await this._run(code);

        // If there is a frame function, start the animation.
        this.tryPlay();

        // // Emit the start event.
        // this.dispatcher.start(this, code);

        // Return the output.
        return out;
    }

    stop() {
        // Stop the animation.
        this.isPlaying = false;

        // // Emit the stop event.
        // this.dispatcher.stop(this, code);

        return null;
    }

    /* Animation                                                                                 */
    /*********************************************************************************************/

    tryPlay() {
        // If there is a "frame" function, call it for animation.
        if (this.has("frame")) {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.frame(0);
            }
        }
    }

    async frame(i) {
        if (!this.isPlaying) return;

        if (this.has("frame")) {
            let out = await this._run(`frame(${i})`, false, false, false);
            if (out != false)
                setTimeout(() => { this.frame(i + 1); }, this.interval * 1000);
        }
    }

    /* Input events                                                                              */
    /*********************************************************************************************/

    click(row, col) {
        if (this.has("click"))
            this._run(`click(${row}, ${col})`, false, false, false);
    }

    keyboard(key) {
        if (this.has("keyboard"))
            this._run(`keyboard("${key}")`, false, false, false);
    }
};
