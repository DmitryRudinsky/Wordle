import { makeAutoObservable } from 'mobx';

import { DEFAULT_MAX_ATTEMPTS, GameStatus } from '@/widgets/interface/mainGame.ts';

interface LetterState {
    value?: string;
    position?: boolean | null;
}

export class MainGameStore {
    attempts: number | null = null;
    maxNumberOfAttempts: number | null = null;
    usedLetters: Record<string, boolean | null> = {};
    guessedLetters: LetterState[][] = [];
    activeRowIndex: number = 0;
    activeColIndex: number = 0;
    pastWords: string[] = [];
    gameStatus: GameStatus | null = null;

    constructor() {
        makeAutoObservable(this);
        this.init();
    }

    init() {
        this.setAttempts(0);
        this.setMaxNumberOfAttempts(DEFAULT_MAX_ATTEMPTS);
        this.setGameStatus('NOT_STARTED');
    }

    setGameStatus(gameStatus: GameStatus) {
        this.gameStatus = gameStatus;
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

    submitWord({ words, selectedWord }: { words?: Map<string, string[]>; selectedWord: string }) {
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

        if (this.activeRowIndex === 0) {
            this.setGameStatus('STARTED');
        }

        const normalizedSelectedWord = selectedWord.toLowerCase();
        const selectedLetters = normalizedSelectedWord.split('');

        const pool: Record<string, number> = {};
        for (const ch of selectedLetters) {
            pool[ch] = (pool[ch] ?? 0) + 1;
        }

        const normalizedGuessLetters = row.map((cell) => (cell.value ?? '').toLowerCase());
        const result: Array<boolean | null> = Array.from({ length: lettersCount }, () => null);

        for (let colIndex = 0; colIndex < lettersCount; colIndex++) {
            const letter = normalizedGuessLetters[colIndex];
            if (!letter) {
                result[colIndex] = null;
                continue;
            }
            if (selectedLetters[colIndex] === letter) {
                result[colIndex] = true;
                pool[letter] -= 1;
                if (this.usedLetters && !this.usedLetters[letter]) {
                    this.usedLetters[letter] = true;
                }
            }
        }

        for (let colIndex = 0; colIndex < lettersCount; colIndex++) {
            if (result[colIndex] === true) {
                continue;
            }
            const letter = normalizedGuessLetters[colIndex];
            if (!letter) {
                result[colIndex] = null;
                continue;
            }
            if ((pool[letter] ?? 0) > 0) {
                result[colIndex] = false;
                pool[letter] -= 1;
                if (this.usedLetters && !this.usedLetters[letter]) {
                    this.usedLetters[letter] = false;
                }
            } else {
                result[colIndex] = null;
                if (this.usedLetters && !this.usedLetters[letter]) {
                    this.usedLetters[letter] = null;
                }
            }
        }

        row.forEach((cell, colIndex) => {
            cell.position = result[colIndex];
        });

        const isAllLettersInCorrectPositions = row.every((cell) => cell.position === true);
        if (isAllLettersInCorrectPositions) {
            this.setGameStatus('COMPLETED_SUCCESSFUL');
        }

        const nextRowIndex = this.activeRowIndex + 1;
        if (nextRowIndex >= this.guessedLetters.length) {
            if (!isAllLettersInCorrectPositions) {
                this.setGameStatus('COMPLETED_FAILURE');
            }
            return;
        }

        this.pastWords.push(guess);
        this.setCursor(nextRowIndex, 0);
        this.setAttempts(nextRowIndex);
    }

    restart(lengthOfRows: number) {
        const attempts = this.maxNumberOfAttempts ?? DEFAULT_MAX_ATTEMPTS;
        this.pastWords = [];
        this.usedLetters = {};
        this.setAttempts(0);
        this.setGameStatus('NOT_STARTED');
        this.setInitialGuessedLetters({
            attempts,
            lengthOfRows,
        });
    }
}

export type MainGameStoreType = InstanceType<typeof MainGameStore>;
