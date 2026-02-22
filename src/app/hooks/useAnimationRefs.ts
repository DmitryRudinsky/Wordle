import { useEffect, useRef } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { GameStatus } from '@/widgets/interface/mainGame.ts';

export const useAnimationRefs = (gameStatus: GameStatus | null, shouldReveal: boolean) => {
    const { animationStore } = useStores();
    const hasAnimatedRef = useRef(false);
    const gameStatusRef = useRef(gameStatus);

    animationStore.mutationAnimationRef({
        gameStatus,
        gameStatusRef,
        hasAnimatedRef,
    });

    useEffect(() => {
        if (shouldReveal && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
        }
    }, [shouldReveal]);

    return {
        hasAnimatedRef,
        shouldPlayAnimation: shouldReveal && !hasAnimatedRef.current,
    };
};
