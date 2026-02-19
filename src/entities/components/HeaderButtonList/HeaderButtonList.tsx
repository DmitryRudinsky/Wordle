import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import AddIcon from '@/entities/components/HeaderButtonList/assets/add.svg?react';
import Question from '@/entities/components/HeaderButtonList/assets/question.svg?react';
import Flag from '@/entities/components/HeaderButtonList/assets/RU.svg?react';
import Settings from '@/entities/components/HeaderButtonList/assets/settings.svg?react';
import Stats from '@/entities/components/HeaderButtonList/assets/stats.svg?react';
import styles from '@/entities/components/HeaderButtonList/HeaderButtonList.module.scss';
import { SystemButton } from '@/shared/ui/SystemButton/SystemButton.tsx';

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
