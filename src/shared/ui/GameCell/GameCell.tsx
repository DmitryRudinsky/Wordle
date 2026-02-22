import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { useAnimationRefs } from '@/app/hooks/useAnimationRefs.ts';
import { useStores } from '@/app/hooks/useStores.ts';
import classes from '@/shared/ui/GameCell/GameCell.module.scss';

interface GameButtonProps {
    rowIndex: number;
    colIndex: number;
}

export const GameCell: React.FC<GameButtonProps> = observer(({ rowIndex, colIndex }) => {
    const { mainGameStore, animationStore } = useStores();
    const { guessedLetters, gameStatus } = mainGameStore;

    const cell = guessedLetters[rowIndex]?.[colIndex];
    const cellValue = cell?.value ?? '';
    const cellPosition = cell?.position;
    const shouldReveal = cellPosition !== undefined;

    const { hasAnimatedRef, shouldPlayAnimation } = useAnimationRefs(gameStatus, shouldReveal);

    const revealStyle = shouldPlayAnimation
        ? { animationDelay: `${animationStore.getRevealDelay(colIndex)}ms` }
        : undefined;

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            id={`gameCell_${rowIndex}_${colIndex}`}
            style={revealStyle}
            className={classNames(classes.GameCell, {
                [classes.reveal]: shouldPlayAnimation,
                [classes.revealed]: shouldReveal && hasAnimatedRef.current,
                [classes[animationStore.LETTER_STATES.CORRECT]]: cellPosition === true,
                [classes[animationStore.LETTER_STATES.ELSEWHERE]]: cellPosition === false,
                [classes[animationStore.LETTER_STATES.INCORRECT]]: cellPosition === null,
                [classes.activeCell]: cellValue && !shouldReveal,
            })}
        >
            {cellValue}
        </div>
    );
});
