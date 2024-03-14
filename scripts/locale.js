/*************************************************************************************************/
/* Localization                                                                                  */
/*************************************************************************************************/

export const LOCALIZATION = {
    "fr":
    {
        "size": "taille",
        "font": "police",
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
        "gray": "gris",
        "red": "rouge",
        "green": "vert",
        "blue": "bleu",
        "yellow": "jaune",
        "orange": "orange",
    }
};


function getLang() {
    // return navigator.language.split('-')[0];
    // NOTE: full localization support will be implemented and tested later :)
    return "en";
}

export function getLocale(lang = null) {
    // Without argument, return {key: key} (ie default english locale)
    // Otherwise, return {key: translation}.

    if (lang && LOCALIZATION[lang]) return LOCALIZATION[lang];

    // Create "X": "X" for the default "en" language.
    let locale = {};
    Object.keys(LOCALIZATION.fr).forEach(key => { locale[key] = key; });
    return locale;
}

export function addLocale(locale) {
    let result = '';
    for (const key in locale) {
        if (Object.hasOwnProperty.call(locale, key)) {
            result += `${locale[key]} = globals().get("${key}", print)\n`;
        }
    }
    return result;
}


export const LANG = getLang();

// This default english locale just contains {key: key}.
export const LOCALE = getLocale();
