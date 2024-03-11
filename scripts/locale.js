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


export function getLang() {
    return navigator.language.split('-')[0];
}

export function getLocale(lang = null) {
    // Without argument, return {key: key} (ie default english locale)
    // Otherwise, return {key: translation}.

    if (lang) return LOCALIZATION[lang];

    // Create "X": "X" for the default "en" language.
    let locale = {};
    Object.keys(LOCALIZATION.fr).forEach(key => { locale[key] = key; });
    return locale;
}

export function addLocale(locale) {
    let result = '';
    for (const key in locale) {
        if (Object.hasOwnProperty.call(locale, key)) {
            result += `${locale[key]} = ${key}\n`;
        }
    }
    return result;
}


// This default englisih locale just contains {key: key}.
export const LOCALE = getLocale();
