import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import { GameButton } from '../../shared/ui/GameButton/GameButton';
import styles from './GameButtonList.module.scss';

export const GameButtonList: React.FC = observer(() => {
    const { wordleStore } = useStores();
    const numberOfAttempts = 6;
    return (
        <div className={styles.list}>
            <div className={styles.listInner}>
                {Array.from({ length: numberOfAttempts }, (_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {Array.from({ length: wordleStore.lettersNumber }, (_, colIndex) => (
                            <GameButton key={colIndex} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});
