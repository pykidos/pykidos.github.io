import { HEADER } from "./constants.js";


/*************************************************************************************************/
/* Localization                                                                                  */
/*************************************************************************************************/

export const LOCALIZATION = {
    "fr":
    {
        "size": "taille",
        "color": "couleur",
        "text": "texte",
        "interval": "intervalle",
        "print": "afficher",

        "fill": "remplir",
        "clear": "effacer",
        "line": "ligne",
        "column": "colonne",
        "diagonal": "diagonale",
        "block": "bloc",

        "black": "noir",
        "white": "blanc",
        "red": "rouge",
        "green": "vert",
        "blue": "bleu",
        "yellow": "jaune",
        "orange": "orange",
    }
};


export function getLocale() {
    let lang = navigator.language.split('-')[0];

    // DEBUG: force EN for now.
    // lang = "en";

    let locale = LOCALIZATION[lang];
    if (!locale) {
        locale = {};
        // Create "X": "X" for the default "en" language.
        const frKeys = Object.keys(LOCALIZATION.fr);
        frKeys.forEach(key => {
            locale[key] = key;
        });
    }
    return locale;
}


export const LOCALE = getLocale();
