import React from 'react';

import { KeyRow } from '@/shared/ui/KeyRow/KeyRow.tsx';

import styles from './KeyBoard.module.scss';

export const KeyBoard: React.FC = () => {
    const firstRow = 'йцукенгшщзхъё'.split('');
    const secondRow = 'фывапролджэ'.split('');
    const thirdRow = 'ячсмитьбю'.split('');
    return (
        <div className={styles.container}>
            <KeyRow row={firstRow} />
            <KeyRow row={secondRow} />
            <KeyRow row={thirdRow} />
        </div>
    );
};
