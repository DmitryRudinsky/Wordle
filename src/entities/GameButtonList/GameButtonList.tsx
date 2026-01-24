import React from 'react';
import styles from './GameButtonList.module.scss'
import { GameButton } from "../../shared/ui/GameButton/GameButton";

interface GameButtonListInterface {
    lettersCount: number;
}

export const GameButtonList: React.FC<GameButtonListInterface> = ({ lettersCount }) => {

    const numberOfAttempts = 6

    return (
        <div className={styles.list}>
            <div className={styles.listInner}>
                {Array.from({ length: numberOfAttempts }, (_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {Array.from({ length: lettersCount }, (_, colIndex) => (
                            <GameButton key={colIndex}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};