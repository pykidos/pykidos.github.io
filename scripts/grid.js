export { Grid };


/*************************************************************************************************/
/* Grid                                                                                          */
/*************************************************************************************************/

class Grid {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.setupDispatcher();
    }

    setupDispatcher() {
    }
};
