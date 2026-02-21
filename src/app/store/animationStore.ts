import { makeAutoObservable } from 'mobx';

export class AnimationStore {
    readonly REVEAL_ANIMATION_MS = 180;
    readonly BACKGROUND_TRANSITION_MS = 500;

    constructor() {
        makeAutoObservable(this);
    }

    readonly LETTER_STATES = {
        CORRECT: 'correctPosition',
        ELSEWHERE: 'elseWherePosition',
        INCORRECT: 'unCorrectLetter',
    } as const;

    getRevealDelay(index: number): number {
        return index * this.REVEAL_ANIMATION_MS;
    }

    getKeyboardRevealDelay(lettersNumber: number): number {
        return this.REVEAL_ANIMATION_MS * lettersNumber;
    }

    getTotalAnimationTime(lettersNumber: number): number {
        return this.getKeyboardRevealDelay(lettersNumber) + this.BACKGROUND_TRANSITION_MS;
    }
}

export type AnimationStoreType = AnimationStore;
