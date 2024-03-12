import { downloadText } from "./utils.js";

export { Panel };


/*************************************************************************************************/
/* Constants                                                                                     */
/*************************************************************************************************/

const PLAY_ICON = "►";
const STOP_ICON = "⏹";


/*************************************************************************************************/
/* Panel                                                                                         */
/*************************************************************************************************/

class Panel {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.runButton = document.getElementById("run-button");
        this.shareButton = document.getElementById("share-button");
        this.downloadButton = document.getElementById("download-button");

        this.setupDispatcher();
        this.setupRunButton();
        this.setupShareButton();
        this.setupDownloadButton();
    }


    /* Setup functions                                                                           */
    /*********************************************************************************************/

    setupDispatcher() {
        this.dispatcher.on("run", (e) => {
            this.setIcon(this.state.isPlaying);
        });
    }

    setupRunButton() {
        this.runButton.addEventListener("click", (e) => {
            // Emit the run event.
            this.dispatcher.run(this, this.model.editor.getCode());
        });
    }

    setupShareButton() {
        this.shareButton.addEventListener("click", (e) => {
            const url = this.model.makeURL(this.state.name);
            console.log("Copying URL:", url);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url);
                this.shareButton.innerHTML = "Copied!";
                setTimeout(() => { this.shareButton.innerHTML = "Share"; }, 1500);
            }
        });
    }

    setupDownloadButton() {
        this.downloadButton.addEventListener("click", (e) => {
            const text = this.model.editor.getCode();
            const filename = `${this.state.name}.py`;
            downloadText(text, filename);
        });
    }

    setIcon(isPlaying) {
        this.runButton.innerHTML = isPlaying ? PLAY_ICON : STOP_ICON;
    }
};
