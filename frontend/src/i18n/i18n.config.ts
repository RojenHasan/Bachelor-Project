import i18next from "i18next"
import { Translation, initReactI18next } from "react-i18next";
import { en, ar } from "./translation";
const resources = {
    en: {
        translation: en,
    },
    ar: {
        translation: ar,

    },
}

i18next
    .use(initReactI18next)
    .init({
        debug: true,
        lng: 'en',
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        interpolation: {
           escapeValue: false,
        },
        resources,
    })

export default i18next;