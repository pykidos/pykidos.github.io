export { Spinner };


/*************************************************************************************************/
/* Spinner                                                                                       */
/*************************************************************************************************/

class Spinner {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        // this.isSpinning = false;
        this.setupDispatcher();
    }

    setSpinning(isSpinning) {
        // this.isSpinning = isSpinning;
        if (isSpinning)
            document.body.classList.add('waiting');
        else
            document.body.classList.remove('waiting');
    }

    setupDispatcher() {
        this.dispatcher.on('spinning', (ev) => { this.setSpinning(ev.isSpinning); });
    }
};
