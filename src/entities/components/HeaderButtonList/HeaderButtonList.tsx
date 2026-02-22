import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import AddIcon from '@/entities/components/HeaderButtonList/assets/add.svg?react';
import Question from '@/entities/components/HeaderButtonList/assets/question.svg?react';
import Flag from '@/entities/components/HeaderButtonList/assets/RU.svg?react';
import Settings from '@/entities/components/HeaderButtonList/assets/settings.svg?react';
import Stats from '@/entities/components/HeaderButtonList/assets/stats.svg?react';
import styles from '@/entities/components/HeaderButtonList/HeaderButtonList.module.scss';
import { ActionButton } from '@/shared/ui/ActionButton/ActionButton.tsx';
import { SystemButton } from '@/shared/ui/SystemButton/SystemButton.tsx';

export const HeaderButtonList: React.FC = observer(() => {
    const { mainGameStore, wordleStore, modalStore, windowStore } = useStores();
    const { window } = windowStore;
    const isGameWindow = window === 'game';

    const handleGiveUpClick = () => {
        modalStore.setGiveUpModalActive(true);
    };

    const handleChallengeClick = () => {
        modalStore.setChallengeModalActive(true);
    };

    return (
        <div className={styles.buttonList}>
            <div className={styles.buttonList__left}>
                <SystemButton textContent={wordleStore.language} option={'dictionary'}>
                    <Flag />
                </SystemButton>
                <ActionButton onClick={handleChallengeClick} disabled={!isGameWindow}>
                    <AddIcon />
                </ActionButton>
                {mainGameStore.gameStatus === 'STARTED' && (
                    <ActionButton onClick={handleGiveUpClick} disabled={!isGameWindow}>
                        Я сдаюсь
                    </ActionButton>
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
