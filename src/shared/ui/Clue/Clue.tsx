import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import Cross from '../../assets/cross.svg?react';
import styles from './Clue.module.scss';

interface ClueInterface {
    children: ReactNode;
}

export const Clue: React.FC<ClueInterface> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.clue}>
            {children}
            <div onClick={() => navigate('/')} className={styles.cross}>
                <Cross />
            </div>
        </div>
    );
};
