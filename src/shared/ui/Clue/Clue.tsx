import React, { ReactNode } from 'react';

import Cross from '../../assets/cross.svg?react';
import styles from './Clue.module.scss';

interface ClueInterface {
    children: ReactNode;
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

export const Clue: React.FC<ClueInterface> = ({ children, setWindow }) => {
    return (
        <div className={styles.clue}>
            {children}
            <div onClick={() => setWindow('game')} className={styles.cross}>
                <Cross />
            </div>
        </div>
    );
};
