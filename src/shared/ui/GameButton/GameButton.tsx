import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import classes from './GameButton.module.scss';

interface GameButtonProps {
    rowIndex: number;
    colIndex: number;
}

export const GameCell: React.FC<GameButtonProps> = observer(({ rowIndex, colIndex }) => {
    const { mainGameStore } = useStores();
    const { guessedLetters } = mainGameStore;

    const cell = guessedLetters[rowIndex]?.[colIndex];
    const cellValue = cell?.value ?? '';
    const cellPosition = cell?.position;

    return (
        <div
            id={`gameCell_${rowIndex}_${colIndex}`}
            className={classNames(classes.GameCell, {
                [classes.correctPosition]: cellPosition === true,
                [classes.unCorrectLetter]: cellPosition === false,
                [classes.elseWherePosition]: cellPosition === null,
            })}
        >
            {cellValue}
        </div>
    );
});
