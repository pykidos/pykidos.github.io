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

    setupDispatcher() {
    }

    new() {
        const listingsCount = localStorage.getItem('listingsCount') || 0;
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

    retrieve(name) {
        const listing = localStorage.getItem(name);
        if (listing !== null) {
            return listing;
        } else {
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
};
