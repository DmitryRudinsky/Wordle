import { observer } from 'mobx-react';
import { useMemo } from 'react';

import { useStores } from '@/app/hooks/useStores';

import { GameCell } from '../../shared/ui/GameButton/GameButton';
import styles from './GameButtonList.module.scss';

export const GameButtonList = observer(() => {
    const { wordleStore, mainGameStore } = useStores();

    const numberOfAttempts = Math.max(0, mainGameStore.maxNumberOfAttempts ?? 0);
    const lettersNumber = Math.max(0, wordleStore.lettersNumber ?? 0);

    const rowIndexes = useMemo(
        () => Array.from({ length: numberOfAttempts }, () => ''),
        [numberOfAttempts],
    );

    const colIndexes = useMemo(
        () => Array.from({ length: lettersNumber }, (_, rowIndex) => rowIndex + 1),
        [lettersNumber],
    );

    return (
        <div className={styles.list}>
            <div className={styles.listInner}>
                {rowIndexes.map((rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {colIndexes.map((colIndex) => (
                            <GameCell key={`cell-${rowIndex}-${colIndex}`} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});
