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
    }

    setupRunButton() {
        this.runButton.addEventListener("click", (e) => {
            // Toggle the button icon.
            let icon = this.runButton.innerHTML;
            this.runButton.innerHTML = icon == PLAY_ICON ? STOP_ICON : PLAY_ICON;

            // Emit the run event.
            this.dispatcher.run(this, this.model.editor.getCode());
        });
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
