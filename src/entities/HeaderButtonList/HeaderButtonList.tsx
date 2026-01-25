import React from 'react';

import { SystemButton } from '../../shared/ui/SystemButton/SystemButton';
import AddIcon from './assets/add.svg?react';
import Question from './assets/question.svg?react';
import Flag from './assets/RU.svg?react';
import Settings from './assets/settings.svg?react';
import Stats from './assets/stats.svg?react';
import styles from './HeaderButtonList.module.scss';

interface ButtonListProps {
    isPlaying: boolean;
    country: string;
}

export const HeaderButtonList: React.FC<ButtonListProps> = ({ isPlaying, country }) => {
    return (
        <div className={styles.buttonList}>
            <div className={styles.buttonList__left}>
                <SystemButton isText={false} textContent={country} option={'dictionary'}>
                    <Flag />
                </SystemButton>
                <SystemButton isText={false} textContent={null} option={'add'}>
                    <AddIcon />
                </SystemButton>
                {isPlaying ? (
                    <SystemButton isText={true} textContent={null} option={'giveUp'}>
                        Я сдаюсь
                    </SystemButton>
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.buttonList__right}>
                <SystemButton isText={false} textContent={null} option={'stats'}>
                    <Stats />
                </SystemButton>
                <SystemButton isText={false} textContent={null} option={'settings'}>
                    <Settings />
                </SystemButton>
                <SystemButton isText={false} textContent={null} option={'question'}>
                    <Question />
                </SystemButton>
            </div>
        </div>
    );
};
