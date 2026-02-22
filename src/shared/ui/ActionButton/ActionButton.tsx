import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './ActionButton.module.scss';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent?: string | null;
    isText?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = observer(
    ({ children, isText, textContent, ...props }: ActionButtonProps) => {
        return (
            <button type='button' className={styles.actionButton} {...props}>
                <div
                    className={classNames(
                        styles.actionButton__inner,
                        isText && styles.actionButton__isText,
                    )}
                >
                    {children}
                    {textContent && <p className={styles.actionButton__text}>{textContent}</p>}
                </div>
            </button>
        );
    },
);
