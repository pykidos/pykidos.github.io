export { Panel };


/*************************************************************************************************/
/* Panel                                                                                         */
/*************************************************************************************************/

class Panel {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.clearButton = document.getElementById("clear-button");
        this.runButton = document.getElementById("run-button");
        this.playButton = document.getElementById("play-button");

        this.setupDispatcher();

        this.setupClearButton();
        this.setupRunButton();
        this.setupPlayButton();
    }

    async init() {
    }

    setupDispatcher() {
    }

    setupClearButton() {
        this.clearButton.addEventListener("click", (e) => {
            this.dispatcher.clear(this);
        });
    }

    setupRunButton() {
        this.runButton.addEventListener("click", (e) => {
            this.dispatcher.run(this, this.model.getCode());
        });
    }

    setupPlayButton() {
        this.playButton.addEventListener("click", (e) => {
            this.dispatcher.play(this, this.model.getCode());
        });
    }
};
