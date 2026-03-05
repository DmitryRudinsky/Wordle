import classNames from 'classnames';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { screenRoute } from '@/app/interfaces/window.ts';

import styles from './SystemButton.module.scss';

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent?: string | null;
    isText?: boolean;
    option: screenRoute;
}

export const SystemButton: React.FC<SystemButtonProps> = ({
    children,
    isText,
    textContent,
    option,
    ...props
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const optionPath = `/${option}`;
    const isActive = location.pathname === optionPath;

    const handleClick = () => {
        navigate(isActive ? '/' : optionPath);
    };

    return (
        <button
            onClick={handleClick}
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
};
