import React from 'react';
import styles from './ButtonList.module.scss';
import SystemButton from "../../shared/ui/SystemButton/SystemButton.tsx";
import AddIcon from './assets/add.svg?react';
import Flag from './assets/RU.svg?react';
import Stats from  './assets/stats.svg?react';
import Settings from  './assets/settings.svg?react';
import Question from  './assets/question.svg?react'


interface ButtonListProps {
    isPlaying: boolean;
    country: string;
}

const ButtonList: React.FC<ButtonListProps> = ({isPlaying, country}) => {
    return (
        <div className={styles['button-list']}>
            <div className={styles['button-list__left']}>
                <SystemButton isText={false} textContent={country}>
                    <Flag/>
                </SystemButton>
                <SystemButton isText={false} textContent={null}>
                    <AddIcon/>
                </SystemButton>
                {isPlaying ?
                    <SystemButton isText={true} textContent={null}>
                        Я сдаюсь
                    </SystemButton>
                    :
                    <></>}
            </div>
            <div className={styles['button-list__right']}>
                <SystemButton isText={false} textContent={null}>
                    <Stats/>
                </SystemButton>
                <SystemButton isText={false} textContent={null}>
                    <Settings/>
                </SystemButton>
                <SystemButton isText={false} textContent={null}>
                    <Question/>
                </SystemButton>
            </div>
        </div>
    );
};

export default ButtonList;