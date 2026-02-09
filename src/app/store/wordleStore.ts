import axios from 'axios';
import { flow, makeAutoObservable } from 'mobx';

import {
    DEFAULT_LANG,
    DEFAULT_LENGTH,
    lang,
    loadState,
    WordleStoreDependencies,
} from '@/app/interfaces/wordle.ts';
import { DEFAULT_MAX_ATTEMPTS } from '@/widgets/interface/mainGame.ts';

export class WordleStore {
    dictionary: null | string[] = null;
    dictionaryLoadState: loadState | null = null;
    mapOfWords: Map<string, string[]> = new Map<string, string[]>();
    language: lang | null = null;
    lettersNumber: number | null = null;
    randomWord: string | null = null;

    constructor(private root: WordleStoreDependencies) {
        makeAutoObservable(this, {
            getDictionary: flow.bound,
            init: flow.bound,
        });

        this.init();
    }

    *init() {
        if (!this.language) {
            this.setLanguage(DEFAULT_LANG);
        }

        if (!this.lettersNumber) {
            this.setLettersNumber(DEFAULT_LENGTH);
        }

        if (!this.dictionary || this.dictionaryLoadState === 'ERROR') {
            yield this.getDictionary();
        } else if (this.randomWord === null) {
            this.setRandomWord();
        }
    }

    private setLoadState(state: loadState) {
        this.dictionaryLoadState = state;
    }

    private clearDictionary() {
        this.dictionary = null;
    }

    private setDictionary(dictionary: string[]) {
        this.dictionary = dictionary;
    }

    private setRandomWord() {
        if (!this.lettersNumber) {
            return;
        }

        const selectedDictionary = this.mapOfWords.get(this.lettersNumber.toString());
        if (!selectedDictionary) {
            return null;
        }

        this.randomWord = selectedDictionary[Math.floor(Math.random() * selectedDictionary.length)];
    }

    private sortDictionary() {
        this.mapOfWords.clear();
        this.dictionary?.forEach((word) => {
            this.setWord(word);
        });
    }

    setLanguage(language: lang) {
        this.language = language;
    }

    setLettersNumber(count: number) {
        this.lettersNumber = count;
        if (this.mapOfWords.size > 0) {
            this.setRandomWord();
        }
        this.root.mainGameStore.setInitialGuessedLetters({
            lengthOfRows: count,
            attempts: this.root.mainGameStore.maxNumberOfAttempts ?? DEFAULT_MAX_ATTEMPTS,
        });
    }

    setWord(word: string) {
        const key = word.length.toString();
        const wordsOfTheSameLength = this.mapOfWords.get(key);

        if (wordsOfTheSameLength) {
            wordsOfTheSameLength.push(word);
            this.mapOfWords.set(key, wordsOfTheSameLength);
        } else {
            this.mapOfWords.set(key, [word]);
        }
    }

    *getDictionary() {
        if (!this.language) {
            this.setLoadState('ERROR');
            return;
        }

        this.setLoadState('LOADING');
        try {
            const response: { data: string[] } = yield axios.get(
                `/api/files/wordle/${this.language}/dictionary.json?1.26`,
            );
            const dictionary = response?.data;

            if (!(dictionary && dictionary.length)) {
                return;
            }

            if (this.dictionary) {
                this.clearDictionary();
            }

            this.randomWord = null;
            this.setDictionary(dictionary);
            this.setLoadState('COMPLETE');
            this.sortDictionary();
            this.setRandomWord();
        } catch (error) {
            console.error(error);
            this.setLoadState('ERROR');
        }
    }
}

export type WordleStoreType = InstanceType<typeof WordleStore>;
