import { makeAutoObservable } from 'mobx';

import { DEFAULT_MAX_ATTEMPTS } from '@/widgets/interface/mainGame.ts';

export class MainGameStore {
    attempts: number | null = null;
    maxNumberOfAttempts: number | null = null;
    isPlaying: boolean = false;
    guessedLetters: string[] | null = null;
    pastWords: string[] | null = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init() {
        this.setAttempts(0);
        this.setMaxNumberOfAttempts(DEFAULT_MAX_ATTEMPTS);
        this.setPastWords(null);
    }

    setInitialGuessedLetters(lettersNumber: number | null) {
        this.guessedLetters =
            typeof lettersNumber === 'number' ? new Array<string>(lettersNumber).fill('') : [];
    }

    setAttempts(attempts: number) {
        this.attempts = attempts;
    }

    setPastWords(pastWord: string | null) {
        if (!pastWord) {
            this.pastWords = [];
            return;
        }

        if (!this.pastWords) {
            this.pastWords = [pastWord];
        } else {
            this.pastWords.push(pastWord);
        }
    }

    setMaxNumberOfAttempts(attempts: number) {
        this.maxNumberOfAttempts = attempts;
    }
}

export type MainGameStoreType = InstanceType<typeof MainGameStore>;
