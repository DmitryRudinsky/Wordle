import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { windowType } from '@/app/interfaces/window.ts';
import { selectPageFromHeader } from '@/shared/utils/selectPageFromHeader.ts';

import styles from './SystemButton.module.scss';

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent?: string | null;
    isText?: boolean;
    option: windowType;
}

export const SystemButton: React.FC<SystemButtonProps> = observer(
    ({ children, isText, textContent, option, ...props }: SystemButtonProps) => {
        const { windowStore } = useStores();
        const isActive = windowStore.window === option;

        return (
            <button
                onClick={() =>
                    selectPageFromHeader({
                        window: windowStore.window,
                        setWindowValue: (value) => windowStore.setWindowValue(value),
                        option,
                    })
                }
                type='button'
                className={classNames(styles.systemButton, isActive && styles.systemButton__active)}
                {...props}
            >
                <div
                    className={classNames(
                        styles.systemButton__inner,
                        isText && styles.systemButton__isText,
                    )}
                >
                    {children}
                    {textContent && <p className={styles.systemButton__text}>{textContent}</p>}
                </div>
            </button>
        );
    },
);
