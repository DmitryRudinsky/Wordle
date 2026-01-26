import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { SystemButton } from '@/shared/ui/SystemButton/SystemButton';

import AddIcon from './assets/add.svg?react';
import Question from './assets/question.svg?react';
import Flag from './assets/RU.svg?react';
import Settings from './assets/settings.svg?react';
import Stats from './assets/stats.svg?react';
import styles from './HeaderButtonList.module.scss';

export const HeaderButtonList: React.FC = observer(() => {
    const { mainGameStore, wordleStore } = useStores();
    return (
        <div className={styles.buttonList}>
            <div className={styles.buttonList__left}>
                <SystemButton textContent={wordleStore.language} option={'dictionary'}>
                    <Flag />
                </SystemButton>
                <SystemButton option={'add'}>
                    <AddIcon />
                </SystemButton>
                {mainGameStore.isPlaying ? (
                    <SystemButton option={'giveUp'}>Я сдаюсь</SystemButton>
                ) : (
                    <></>
                )}
            </div>
            <div className={styles.buttonList__right}>
                <SystemButton option={'stats'}>
                    <Stats />
                </SystemButton>
                <SystemButton option={'settings'}>
                    <Settings />
                </SystemButton>
                <SystemButton option={'question'}>
                    <Question />
                </SystemButton>
            </div>
        </div>
    );
});
