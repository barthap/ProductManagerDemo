import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en from './languages/en.json';
import pl from './languages/pl.json';

i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = {
    en,
    "pl-PL": pl
};

console.log('Current locale', Localization.locale);
console.log('i18n current', i18n.currentLocale());
console.log('All locales', Localization.locales);

export default i18n;
