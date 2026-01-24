import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './SystemButton.module.scss';

interface SystemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    textContent: string | undefined | null;
    isText: boolean
    setWindow: React.Dispatch<React.SetStateAction<string>>;
    option: string
    window: string
}

export const SystemButton: React.FC<SystemButtonProps> = ({ children, isText, textContent, setWindow, option, window, ...props }) => {

    const changeNavFunction = () => {
        if(window === 'game' || window !== option) {
            setWindow(option);
        } else if (window === option) {
            setWindow('game')
        }
    };

    return (
        <button onClick={changeNavFunction} type='button' className={styles.systemButton} {...props}>
            <div style={isText ? { padding: "7px 5px" } : {}} className={styles.systemButton__inner}>
                {children}
                {textContent ? <p className={styles.systemButton__text}>{textContent}</p> : <></>}
            </div>
        </button>
    );
};