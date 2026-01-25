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

export const DEFAULT_LANG: lang = 'ru';

export function isLang(value: unknown): value is lang {
    return (
        typeof value === 'string'
        && (SUPPORTED_LANGS as readonly string[]).includes(value)
    );
}