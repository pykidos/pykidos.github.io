export { Storage };


/*************************************************************************************************/
/* Storage                                                                                       */
/*************************************************************************************************/

class Storage {
    constructor(state, model, dispatcher) {
        this.state = state;
        this.model = model;
        this.dispatcher = dispatcher;

        this.setupDispatcher();
    }

    init() {
        if (this.count() == 0) {
            this.new();
        }
    }

    setupDispatcher() {
        this.dispatcher.on("select", (e) => {
            try {
                let code = this.retrieve(e.name);
                this.model.setCode(code);
                this.state.name = e.name;
            }
            catch (err) {
                console.warn(`Code listing ${e.name} not found.`);
            }
        });

        // Save on run.
        this.dispatcher.on("run", (e) => {
            let code = this.model.getCode();
            this.save(this.state.name, code);
        });

        this.dispatcher.on("new", (e) => {
            this.updateSelector(this.new());
        });

        this.dispatcher.on("rename", (e) => {
            this.rename(e.oldName, e.newName);
            this.updateSelector(e.newName);
        });

        this.dispatcher.on("delete", (e) => {
            this.delete(e.name);
            this.updateSelector(this.first());
        });
    }

    updateSelector(name) {
        // The selector will update the list of names with this and will raise a new select event.
        this.dispatcher.setNames(this, this.list(), name);
    }

    count() {
        return localStorage.getItem('listingsCount') || 0;
    }

    new() {
        const listingsCount = this.count();
        const newName = `untitled ${listingsCount}`;
        localStorage.setItem(newName, '');
        localStorage.setItem('listingsCount', parseInt(listingsCount) + 1);
        return newName;
    }

    rename(oldName, newName) {
        const listing = localStorage.getItem(oldName);
        if (listing !== null) {
            localStorage.setItem(newName, listing);
            localStorage.removeItem(oldName);
        } else {
            throw new Error(`Listing "${oldName}" not found.`);
        }
    }

    save(name, code) {
        localStorage.setItem(name, code);
    }

    first() {
        const listingNames = Object.keys(localStorage);
        if (listingNames.length > 0) {
            const firstName = listingNames[0];
            const code = localStorage.getItem(firstName);
            this.dispatcher.select(this, firstName, code);
        }
    }

    retrieve(name) {
        const listing = localStorage.getItem(name);
        if (listing !== null) {
            return listing;
        }
        else {
            throw new Error(`Listing "${name}" not found.`);
        }
    }

    list(order) {
        const listingNames = Object.keys(localStorage);
        const filteredNames = listingNames.filter(name => name !== 'listingsCount');
        if (order === 'desc') {
            return filteredNames.sort().reverse();
        } else {
            return filteredNames.sort();
        }
    }

    delete(name) {
        localStorage.removeItem(name);
    }
};
