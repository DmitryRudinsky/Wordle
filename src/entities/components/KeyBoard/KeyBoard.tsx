import React from 'react';

import { KeyButton } from '@/shared/ui/KeyButton/KeyButton.tsx';
import { KeyRow } from '@/shared/ui/KeyRow/KeyRow.tsx';

import BackspaceIcon from './assets/backspace-svgrepo-com.svg';
import styles from './KeyBoard.module.scss';

export const KeyBoard: React.FC = () => {
    const firstRow = 'йцукенгшщзхъё'.split('');
    const secondRow = 'фывапролджэ'.split('');
    const thirdRow = 'ячсмитьбю'.split('');
    return (
        <div className={styles.container}>
            <KeyRow row={firstRow} />
            <KeyRow row={secondRow} />
            <div className={styles.lastRow}>
                <KeyButton action='backspace'>
                    <img src={BackspaceIcon} alt='backspace' />
                </KeyButton>
                {thirdRow.map((button, index) => (
                    <KeyButton key={`${button}_${index}`}>{button}</KeyButton>
                ))}
                <KeyButton action='enter'>Enter</KeyButton>
            </div>
        </div>
    );
};
