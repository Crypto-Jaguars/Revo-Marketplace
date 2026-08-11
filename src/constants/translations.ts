import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

export type TranslationMap = typeof enMessages;

export const translations = {
  en: enMessages as TranslationMap,
  es: esMessages as TranslationMap,
};

export default translations;
