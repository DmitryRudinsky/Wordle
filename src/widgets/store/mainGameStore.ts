import { makeAutoObservable } from 'mobx';

import { DEFAULT_MAX_ATTEMPTS } from '@/widgets/interface/mainGame.ts';

interface LetterState {
    value?: string;
    position?: boolean | null;
}

export class MainGameStore {
    attempts: number | null = null;
    maxNumberOfAttempts: number | null = null;
    isPlaying: boolean = false;
    guessedLetters: LetterState[][] = [];

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init() {
        this.setAttempts(0);
        this.setMaxNumberOfAttempts(DEFAULT_MAX_ATTEMPTS);
    }

    setGuessedLetters({ attempts, lengthOfRows }: { attempts: number; lengthOfRows: number }) {
        this.guessedLetters = Array.from({ length: attempts }, () =>
            Array.from({ length: lengthOfRows }, (): LetterState => {
                return {};
            }),
        );
    }

    setAttempts(attempts: number) {
        this.attempts = attempts;
    }

    setMaxNumberOfAttempts(attempts: number) {
        this.maxNumberOfAttempts = attempts;
    }
}

export type MainGameStoreType = InstanceType<typeof MainGameStore>;
