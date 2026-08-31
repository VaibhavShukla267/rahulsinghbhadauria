import en from '../translations/en.json';
import hi from '../translations/hi.json';

class LanguageService {
  constructor() {
    if (LanguageService.instance) {
      return LanguageService.instance;
    }
    this.currentLanguage = 'hi';
    this.translations = { en, hi };
    this.listeners = new Set();
    LanguageService.instance = this;
  }

  initClientLanguage() {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && savedLanguage !== this.currentLanguage) {
        this.setLanguage(savedLanguage);
      }
    }
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.notifyListeners();
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  translate(key) {
    if (!key) return '';
    const keys = key.split('.');
    
    // 1. Try current language
    let current = this.translations[this.currentLanguage];
    let found = true;
    for (const k of keys) {
      if (!current || current[k] === undefined) {
        found = false;
        break;
      }
      current = current[k];
    }
    if (found && current !== undefined && current !== null) {
      return current;
    }

    // 2. Fall back to Hindi
    let fallbackHi = this.translations['hi'];
    let foundHi = true;
    for (const k of keys) {
      if (!fallbackHi || fallbackHi[k] === undefined) {
        foundHi = false;
        break;
      }
      fallbackHi = fallbackHi[k];
    }
    if (foundHi && fallbackHi !== undefined && fallbackHi !== null) {
      return fallbackHi;
    }

    // 3. Fall back to English
    let fallbackEn = this.translations['en'];
    let foundEn = true;
    for (const k of keys) {
      if (!fallbackEn || fallbackEn[k] === undefined) {
        foundEn = false;
        break;
      }
      fallbackEn = fallbackEn[k];
    }
    if (foundEn && fallbackEn !== undefined && fallbackEn !== null) {
      return fallbackEn;
    }

    // 4. Human-readable key fallback
    const lastKey = keys[keys.length - 1];
    return lastKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}

export const languageService = new LanguageService();
export const t = (key) => languageService.translate(key);

