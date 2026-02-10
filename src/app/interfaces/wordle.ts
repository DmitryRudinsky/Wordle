import type { MainGameStoreType } from '@/widgets/store/mainGameStore.ts';

export type loadState = 'LOADING' | 'COMPLETE' | 'ERROR';

export const SUPPORTED_LANGS = [
    'en',
    'uk',
    'es',
    'fr',
    'de',
    'pt',
    'it',
    'nl',
    'ru',
    'pl',
    'sv',
    'tr',
    'id',
] as const;

export type lang = (typeof SUPPORTED_LANGS)[number];

export const LANG_TEST_RE = {
    en: /^[A-Za-z\s\-’']*$/u,

    uk: /^[АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя\s\-’']*$/u,

    es: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡\s\-’']*$/u,

    fr: /^[A-Za-zÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸàâæçéèêëîïôœùûüÿ\s\-’']*$/u,

    de: /^[A-Za-zÄÖÜẞäöüß\s\-’']*$/u,

    pt: /^[A-Za-zÁÀÂÃÇÉÊÍÓÔÕÚÜáàâãçéêíóôõúü\s\-’']*$/u,

    it: /^[A-Za-zÀÈÉÌÍÎÒÓÙàèéìíîòóù\s\-’']*$/u,

    nl: /^[A-Za-zĲĳËÏëï\s\-’']*$/u,

    ru: /^[А-Яа-яЁё\s\-’']*$/u,

    pl: /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż\s\-’']*$/u,

    sv: /^[A-Za-zÅÄÖåäö\s\-’']*$/u,

    tr: /^[A-Za-zÇĞİIÖŞÜçğıöşü\s\-’']*$/u,

    id: /^[A-Za-z\s\-’']*$/u,
} satisfies Record<lang, RegExp>;

export const DEFAULT_LANG: lang = 'ru';
export const DEFAULT_LENGTH: number = 5;

export function isLang(value: unknown): value is lang {
    return typeof value === 'string' && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export interface WordleStoreDependencies {
    mainGameStore: MainGameStoreType;
}
