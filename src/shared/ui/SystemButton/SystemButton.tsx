import { observer } from 'mobx-react';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { windowType } from '@/app/interfaces/window.ts';

import styles from './SystemButton.module.scss';

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent: string | undefined | null;
    isText: boolean;
    option: windowType;
}

export const SystemButton: React.FC<SystemButtonProps> = observer(
    ({ children, isText, textContent, option, ...props }: SystemButtonProps) => {
        const { windowStore } = useStores();
        const window = windowStore.window;
        const changeNavFunction = () => {
            if (window === 'game' || window !== option) {
                windowStore.setWindowValue(option);
            } else if (window === option) {
                windowStore.setWindowValue('game');
            }
        };

        return (
            <button
                onClick={changeNavFunction}
                type='button'
                className={styles.systemButton}
                {...props}
            >
                <div
                    style={isText ? { padding: '7px 5px' } : {}}
                    className={styles.systemButton__inner}
                >
                    {children}
                    {textContent ? (
                        <p className={styles.systemButton__text}>{textContent}</p>
                    ) : (
                        <></>
                    )}
                </div>
            </button>
        );
    },
);
