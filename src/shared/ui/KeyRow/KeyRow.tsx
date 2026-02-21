import React from 'react';

import { KeyButton } from '@/shared/ui/KeyButton/KeyButton.tsx';

import styles from './KeyRow.module.scss';

interface KeyRowProps {
    row: string[];
}

export const KeyRow: React.FC<KeyRowProps> = ({ row }) => {
    return (
        <div className={styles.keyRow}>
            {row.map((button, index) => {
                return <KeyButton key={`${button}_${index}`}>{button}</KeyButton>;
            })}
        </div>
    );
};
