import React, { ReactNode } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import Cross from '../../assets/cross.svg?react';
import styles from './Clue.module.scss';

interface ClueInterface {
    children: ReactNode;
}

export const Clue: React.FC<ClueInterface> = ({ children }) => {
    const { windowStore } = useStores();
    return (
        <div className={styles.clue}>
            {children}
            <div onClick={() => windowStore.setWindowValue('game')} className={styles.cross}>
                <Cross />
            </div>
        </div>
    );
};
