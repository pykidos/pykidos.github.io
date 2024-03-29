export { State };




/*************************************************************************************************/
/* Defaults                                                                                      */
/*************************************************************************************************/

const DEFAULT_NAME = "";



/*************************************************************************************************/
/* Utils                                                                                         */
/*************************************************************************************************/

function url2state() {
    let query = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return query.state || {};
}


function state2url(state_) {
    // Perform a copy of the state.
    let state = { ...state_ };

    // Generate the URL.
    let url = new URL(window.location);
    let params = url.searchParams;

    // Add the state to the query string
    params.set('state', encode(state));

    return url.toString();
}



/*************************************************************************************************/
/* State                                                                                         */
/*************************************************************************************************/

class State {
    constructor() {
        this._toggle = true;
        this.fromURL();
    }

    init(state) {
        this.name = state.name || DEFAULT_NAME;
        this.isPlaying = false; // NOTE: always start false.
    }

    reset() {
        this.init();
    }

    toggleUpdate(toggle) {
        this._toggle = toggle;
    }

    updateURL() {
        if (!this._toggle) return;
        console.log("update URL with current state");
        let url = this.toURL();
        window.history.replaceState(null, '', url.toString());
        return url;
    }

    fromURL() {
        let state = url2state();
        this.init(state);
    }

    toURL() {
        let cpy = { ...this };
        delete cpy._toggle;
        cpy.selected = Array.from(cpy.selected);
        let url = state2url(cpy);
        return url;
    }
};
