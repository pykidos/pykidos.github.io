import { HEADER } from "./constants.js";


/*************************************************************************************************/
/* Localization                                                                                  */
/*************************************************************************************************/

export const LOCALIZATION = {
    "en":
    {
        "size": "size",
        "color": "color"
    },
    "fr":
    {
        "size": "taille",
        "color": "couleur"
    }
};


export function getLocalizedHeader() {
    let lang = navigator.language.split('-')[0];

    // DEBUG: force english
    lang = "en";

    let locale = LOCALIZATION[lang];
    if (!locale) locale = LOCALIZATION["en"];
    console.assert(locale);

    return HEADER(locale);
}
