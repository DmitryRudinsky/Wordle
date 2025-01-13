import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './SystemButton.module.scss';

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent: string | undefined | null;
    isText: boolean
}

const SystemButton: React.FC<SystemButtonProps> = ({ children, isText, textContent, ...props }) => {
    return (
        <button type='button' className={styles.systemButton} {...props}>
            <div style={isText ? {padding: "7px 5px"} : {}} className={styles.systemButton__inner}>
                {children}
                {textContent ? <p className={styles.systemButton__text}>{textContent}</p> : <></>}
            </div>
        </button>
    );
};

export default SystemButton;