import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import classes from '@/shared/ui/GameButton/GameCell.module.scss';

interface GameButtonProps {
    rowIndex: number;
    colIndex: number;
}

const REVEAL_ANIMATION_MS = 180;

export const GameCell: React.FC<GameButtonProps> = observer(({ rowIndex, colIndex }) => {
    const { mainGameStore } = useStores();
    const { guessedLetters } = mainGameStore;

    const cell = guessedLetters[rowIndex]?.[colIndex];
    const cellValue = cell?.value ?? '';
    const cellPosition = cell?.position;
    const shouldReveal = cellPosition !== undefined;
    const revealStyle = shouldReveal
        ? { animationDelay: `${colIndex * REVEAL_ANIMATION_MS}ms` }
        : undefined;

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            id={`gameCell_${rowIndex}_${colIndex}`}
            style={revealStyle}
            className={classNames(classes.GameCell, {
                [classes.reveal]: shouldReveal,
                [classes.correctPosition]: cellPosition === true,
                [classes.elseWherePosition]: cellPosition === false,
                [classes.unCorrectLetter]: cellPosition === null,
                [classes.activeCell]: cellValue && !shouldReveal,
            })}
        >
            {cellValue}
        </div>
    );
});
