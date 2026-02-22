import { useEffect, useRef } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { GameStatus } from '@/widgets/interface/mainGame.ts';

export const useAnimationRefs = ({
    gameStatus,
    shouldReveal,
    letterUsedState,
    letterKey,
}: {
    gameStatus: GameStatus | null;
    shouldReveal: boolean;
    letterUsedState?: boolean | null;
    letterKey?: string;
}) => {
    const { animationStore } = useStores();
    const hasAnimatedRef = useRef<boolean | null>(null);
    const gameStatusRef = useRef(gameStatus);

    animationStore.mutationAnimationRef({
        gameStatus,
        gameStatusRef,
        hasAnimatedRef,
    });

    useEffect(() => {
        if (shouldReveal && letterKey) {
            const newValue = letterUsedState !== undefined ? letterUsedState : null;

            hasAnimatedRef.current = newValue;
            animationStore.markKeyAsAnimated(letterKey, newValue);
        }
    }, [shouldReveal, letterUsedState, letterKey, animationStore]);

    const animationState = letterKey
        ? animationStore.getKeyAnimationState(letterKey)
        : hasAnimatedRef.current;
    const shouldPlayAnimation = shouldReveal && animationState === null;

    return {
        hasAnimatedRef,
        shouldPlayAnimation,
    };
};
