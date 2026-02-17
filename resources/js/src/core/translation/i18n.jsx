import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import langResources from "@/src/config/translation/langResources.jsx";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: import.meta.env.VITE_LOCALE,
        interpolation: {
            escapeValue: false,
        },
        resources: langResources
    });

export default i18n;
