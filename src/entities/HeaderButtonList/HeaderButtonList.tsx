import React from 'react';

import { SystemButton } from '../../shared/ui/SystemButton/SystemButton';
import AddIcon from './assets/add.svg?react';
import Question from  './assets/question.svg?react'
import Flag from './assets/RU.svg?react';
import Settings from  './assets/settings.svg?react';
import Stats from  './assets/stats.svg?react';
import styles from './HeaderButtonList.module.scss';


interface ButtonListProps {
    isPlaying: boolean;
    country: string;
    setWindow: React.Dispatch<React.SetStateAction<string>>;
    window: string;
}

export const HeaderButtonList: React.FC<ButtonListProps> = ({ isPlaying, country, setWindow, window }) => {
    return (
        <div className={styles.buttonList}>
            <div className={styles.buttonList__left}>
                <SystemButton isText={false} textContent={country} setWindow={setWindow} option={'dictionary'} window={window}>
                    <Flag/>
                </SystemButton>
                <SystemButton isText={false} textContent={null} setWindow={setWindow} option={'add'} window={window}>
                    <AddIcon/>
                </SystemButton>
                {isPlaying ?
                    <SystemButton isText={true} textContent={null} setWindow={setWindow} option={'giveUp'} window={window}>
                        Я сдаюсь
                    </SystemButton>
                    :
                    <></>}
            </div>
            <div className={styles.buttonList__right}>
                <SystemButton isText={false} textContent={null} setWindow={setWindow} option={'stats'} window={window}>
                    <Stats/>
                </SystemButton>
                <SystemButton setWindow={setWindow} isText={false} textContent={null} option={'settings'} window={window}>
                    <Settings/>
                </SystemButton>
                <SystemButton isText={false} textContent={null} setWindow={setWindow} option={'question'} window={window}>
                    <Question/>
                </SystemButton>
            </div>
        </div>
    );
};