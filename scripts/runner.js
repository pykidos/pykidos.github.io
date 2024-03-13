import { HEADER, FOOTER, DEFAULT_INTERVAL } from "./constants.js";
import { LANG, getLocale, addLocale } from "./locale.js";
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
        this.hasGlobals = false;
        this.outputElement = document.getElementById("terminal-output");

        this.interval = DEFAULT_INTERVAL;

        this.setupDispatcher();
    }

    async init() {
        // Start the spinning cursor.
        this.dispatcher.spinning(this, true);

        this.pyodide = await loadPyodide();
        this.pyodide.setStdout({
            batched: (text) => {
                this.stdout(text);
            }
        });

        // Stop the spinning cursor.
        this.dispatcher.spinning(this, false);
    }

    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupDispatcher() {
        this.dispatcher.on("run", (e) => { this.run(e.code); });
        this.dispatcher.on("select", async (e) => {
            // Clear global variables when selecting a new listing.
            this.clearGlobals();
            this.clearOutput();
        });

        this.model.grid.onClick((i, j) => { this.click(i, j); });
        this.model.grid.onKeyboard(key => { this.keyboard(key); });
    }

    /* Clearing                                                                                  */
    /*********************************************************************************************/

    clearOutput() {
        this.outputElement.textContent = "";
        this.outputElement.classList.remove("error");
    }

    clearGlobals() {
        if (!this.pyodide) return;

        // Clear the global variables.
        this.globals = this.pyodide.toPy({});
        this.hasGlobals = false;
    }

    clearGrid() {
        this.model.grid.clear();
    }

    /* Output functions                                                                          */
    /*********************************************************************************************/

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

    async _run(code, addHeader = true, addFooter = true) {
        // Start the spinning cursor.
        this.dispatcher.spinning(this, true);

        // HACK
        if (code.includes("numpy"))
            await this.pyodide.loadPackage("numpy");

        // Construct the code.
        let fullCode = this.makeCode(code, addHeader, addFooter);
        let out = false;

        // Try running the code and update the output.
        try {
            let options = { "globals": this.globals };
            out = await this.pyodide.runPython(fullCode, options);
            this.stdout(""); // NOTE: the console output is appended via the pyodide batch callback
        }
        catch (error) {
            this.stderr(error);
        }

        // Parse the interval: use the localized variable name.
        // NOTE: use the code metadata instead.
        let interval = this.get('interval', LANG) || this.get('interval');
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
        let locale = getLocale(LANG); // TODO: take from code metadata instead

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
            let locale = getLocale(lang);
            varName = locale[varName];
        }
        if (!varName) return null;
        return this.globals ? this.globals.toJs().get(varName) : null;
    }

    has(varName) {
        return this.globals && (this.get(varName) != null);
    }

    /* Runner                                                                                    */
    /*********************************************************************************************/

    async run(code) {
        if (!code) return;
        let out = null;

        // If is playing, stop.
        if (this.state.isPlaying) {
            out = this.stop();
        }

        // If not playing, run the code.
        else {
            out = await this.start(code);
        }

        // Save the code in the storage.
        this.model.save(this.state.name);

        return out;
    }

    async start(code) {
        // Lazily initialize the pyodide engine.
        if (!this.pyodide) await this.init();

        // Clear everything.
        this.clearOutput();
        this.clearGlobals();
        this.clearGrid();

        // Run the code.
        let out = await this._run(code);
        this.hasGlobals = true;

        // If there is a frame function, start the animation.
        this.tryPlay();

        // Return the output.
        return out;
    }

    stop() {
        // Stop the animation.
        this.state.isPlaying = false;

        return null;
    }

    /* Animation                                                                                 */
    /*********************************************************************************************/

    tryPlay() {
        // If there is a "frame" function, call it for animation.
        if (this.has("frame")) {
            if (!this.state.isPlaying) {
                this.state.isPlaying = true;
                this.frame(0);
            }
        }
        else {
            // HACK: reset the play icon in the panel.
            this.state.isPlaying = true;
            this.dispatcher.run(this, "");
            this.state.isPlaying = false;
        }
    }

    async frame(i) {
        if (!this.state.isPlaying) return;

        if (this.has("frame")) {
            let out = await this._run(`frame(${i})`, false, false, false, false);
            if (out != false)
                setTimeout(() => { this.frame(i + 1); }, this.interval * 1000);
        }
    }

    /* Input events                                                                              */
    /*********************************************************************************************/

    _firstRun() {
        // Run the code if it hasn't run yet.
        if (!this.hasGlobals) {
            const code = this.model.editor.getCode();
            this.start(code);
        }
    }

    click(row, col) {
        this._firstRun();
        if (this.has("click"))
            this._run(`click(${row}, ${col})`, false, false, false, false);
    }

    keyboard(key) {
        this._firstRun();
        if (this.has("keyboard"))
            this._run(`keyboard("${key}")`, false, false, false, false);
    }
};
