import { makeAutoObservable } from 'mobx';
import React from 'react';

import { GameStatus } from '@/widgets/interface/mainGame.ts';

export class AnimationStore {
    readonly REVEAL_ANIMATION_MS = 180;
    readonly BACKGROUND_TRANSITION_MS = 500;

    private animatedKeys = new Map<string, boolean | null>();
    private lastResetGameStatus: GameStatus | null = null;

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

    hasKeyAnimated(letterKey: string): boolean {
        return this.animatedKeys.has(letterKey);
    }

    getKeyAnimationState(letterKey: string): boolean | null {
        if (!this.animatedKeys.has(letterKey)) {
            return null;
        }
        return this.animatedKeys.get(letterKey) ?? null;
    }

    markKeyAsAnimated(letterKey: string, state: boolean | null): void {
        const currentState = this.animatedKeys.get(letterKey);
        const shouldUpdate =
            currentState === undefined ||
            (currentState === null && state !== null) ||
            (currentState === false && state === true);

        if (shouldUpdate) {
            this.animatedKeys.set(letterKey, state);
        }
    }

    resetKeyAnimations(): void {
        this.animatedKeys.clear();
        this.lastResetGameStatus = 'NOT_STARTED';
    }

    mutationAnimationRef({
        gameStatus,
        hasAnimatedRef,
        gameStatusRef,
    }: {
        gameStatus: GameStatus | null;
        hasAnimatedRef: React.MutableRefObject<boolean | null>;
        gameStatusRef: React.MutableRefObject<GameStatus | null>;
    }) {
        if (!hasAnimatedRef || !gameStatusRef || !gameStatus) {
            return;
        }
        if (
            gameStatus === 'NOT_STARTED' &&
            gameStatusRef.current !== 'NOT_STARTED' &&
            this.lastResetGameStatus !== gameStatus
        ) {
            hasAnimatedRef.current = null;
            gameStatusRef.current = gameStatus;
            this.resetKeyAnimations();
        } else if (gameStatus !== gameStatusRef.current) {
            gameStatusRef.current = gameStatus;
            if (gameStatus !== 'NOT_STARTED' && this.lastResetGameStatus === 'NOT_STARTED') {
                this.lastResetGameStatus = null;
            }
        }
    }
}

export type AnimationStoreType = AnimationStore;
