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

        this.setupDispatcher();
        this.setupRunButton();

        // this.clearButton = document.getElementById("clear-button");
        // this.stopButton = document.getElementById("stop-button");
        // this.setupClearButton();
        // this.setupStopButton();
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

    setIcon(isPlaying) {
        this.runButton.innerHTML = isPlaying ? PLAY_ICON : STOP_ICON;
    }

    // setupClearButton() {
    //     this.clearButton.addEventListener("click", (e) => {
    //         this.dispatcher.clear(this);
    //     });
    // }
    // setupStopButton() {
    //     this.stopButton.addEventListener("click", (e) => {
    //         this.dispatcher.stop(this);
    //     });
    // }
};
