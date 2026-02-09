import { action, makeAutoObservable } from 'mobx';

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
    activeRowIndex: number = 0;
    activeColIndex: number = 0;
    pastWords: string[] = [];

    constructor() {
        makeAutoObservable(
            this,
            {
                init: action.bound,
                setInitialGuessedLetters: action.bound,
                setAttempts: action.bound,
                setMaxNumberOfAttempts: action.bound,
                setCursor: action.bound,
                typeLetter: action.bound,
                backspace: action.bound,
                clearCell: action.bound,
                submitWord: action.bound,
            },
            { autoBind: true },
        );
        this.init();
    }

    init() {
        this.setAttempts(0);
        this.setMaxNumberOfAttempts(DEFAULT_MAX_ATTEMPTS);
    }

    setInitialGuessedLetters({
        attempts,
        lengthOfRows,
    }: {
        attempts: number;
        lengthOfRows: number;
    }) {
        this.guessedLetters = Array.from({ length: attempts }, () =>
            Array.from({ length: lengthOfRows }, (): LetterState => {
                return {};
            }),
        );
        this.setCursor(0, 0);
    }

    setAttempts(attempts: number) {
        this.attempts = attempts;
    }

    setMaxNumberOfAttempts(attempts: number) {
        this.maxNumberOfAttempts = attempts;
    }

    setCursor(rowIndex: number, colIndex: number) {
        this.activeRowIndex = Math.max(0, rowIndex);
        this.activeColIndex = Math.max(0, colIndex);
    }

    private setGuessedLetters({
        rowIndex,
        colIndex,
        value,
    }: {
        rowIndex: number;
        colIndex: number;
        value: string;
    }) {
        const row = this.guessedLetters[rowIndex];
        if (!row) {
            return;
        }

        row[colIndex] = {
            value,
        };
    }

    private checkForMatches(guess: string) {
        return this.pastWords.includes(guess);
    }

    clearCell({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) {
        const row = this.guessedLetters[rowIndex];
        if (!row) {
            return;
        }
        row[colIndex] = {};
    }

    typeLetter(letter: string) {
        const row = this.guessedLetters[this.activeRowIndex];
        if (!row) {
            return;
        }
        if (this.activeColIndex >= row.length) {
            return;
        }

        this.setGuessedLetters({
            rowIndex: this.activeRowIndex,
            colIndex: this.activeColIndex,
            value: letter,
        });
        this.activeColIndex += 1;
    }

    backspace() {
        const row = this.guessedLetters[this.activeRowIndex];
        if (!row) {
            return;
        }

        if (this.activeColIndex <= 0) {
            return;
        }
        this.activeColIndex -= 1;
        this.clearCell({ rowIndex: this.activeRowIndex, colIndex: this.activeColIndex });
    }

    submitWord(words?: Map<string, string[]>) {
        const row = this.guessedLetters[this.activeRowIndex];

        if (!row) {
            return;
        }

        const lettersCount = row.length;
        if (this.activeColIndex !== lettersCount) {
            return;
        }

        if (!words) {
            return;
        }

        const guess = row
            .map((cell) => cell.value ?? '')
            .join('')
            .toLowerCase();
        if (guess.length !== lettersCount) {
            return;
        }

        if (this.checkForMatches(guess)) {
            return;
        }

        const dictionary = words.get(lettersCount.toString());
        if (!dictionary) {
            return;
        }

        const existsInDictionary = dictionary.includes(guess);
        if (!existsInDictionary) {
            return;
        }

        const nextRowIndex = this.activeRowIndex + 1;
        if (nextRowIndex >= this.guessedLetters.length) {
            console.debug('победа');
        }

        this.pastWords.push(guess);
        this.setCursor(nextRowIndex, 0);
        this.setAttempts(nextRowIndex);
    }
}

export type MainGameStoreType = InstanceType<typeof MainGameStore>;
