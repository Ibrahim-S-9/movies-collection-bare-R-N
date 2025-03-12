import {I18n} from 'i18n-js';
import ar from './locales/ar';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import it from './locales/it';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import ru from './locales/ru';
import zh from './locales/zh';

const i18n = new I18n({
  ar,
  de,
  en,
  es,
  fr,
  it,
  ja,
  ko,
  pt,
  ru,
  zh,
});

i18n.locale = 'en';
i18n.fallbacks = true;

export default i18n;
