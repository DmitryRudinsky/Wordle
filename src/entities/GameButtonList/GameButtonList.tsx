import React from 'react';
import styles from './GameButtonList.module.scss'
import GameButton from "../../shared/ui/GameButton/GameButton";

interface GameButtonListInterface {
    letterCount: number;
}

const GameButtonList: React.FC<GameButtonListInterface> = ({letterCount}) => {

    const numberOfAttempts = 6

    return (
        <div className={styles.list}>
            <div className={styles.listInner}>
                {Array.from({ length: numberOfAttempts }, (_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {Array.from({ length: letterCount }, (_, colIndex) => (
                            <GameButton key={colIndex}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameButtonList;