import { makeAutoObservable } from 'mobx';
import React from 'react';

import { GameStatus } from '@/widgets/interface/mainGame.ts';

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

    mutationAnimationRef({
        gameStatus,
        hasAnimatedRef,
        gameStatusRef,
    }: {
        gameStatus: GameStatus | null;
        hasAnimatedRef: React.MutableRefObject<boolean>;
        gameStatusRef: React.MutableRefObject<GameStatus | null>;
    }) {
        if (!hasAnimatedRef || !gameStatusRef || !gameStatus) {
            return;
        }
        if (gameStatus === 'NOT_STARTED' && gameStatusRef.current !== 'NOT_STARTED') {
            hasAnimatedRef.current = false;
            gameStatusRef.current = gameStatus;
        } else if (gameStatus !== gameStatusRef.current) {
            gameStatusRef.current = gameStatus;
        }
    }
}

export type AnimationStoreType = AnimationStore;
