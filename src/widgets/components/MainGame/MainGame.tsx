import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { GameButtonList } from '@/entities/GameButtonList/GameButtonList.tsx';
import globalStyle from '@/shared/global_styles/_global.module.scss';

import styles from './MainGame.module.scss';

export const MainGame: React.FC = observer(() => {
    const { mainGameStore, wordleStore } = useStores();
    const { mapOfWords: words, randomWord } = wordleStore;
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            if (
                mainGameStore.gameStatus === 'COMPLETED_SUCCESSFUL' ||
                mainGameStore.gameStatus === 'COMPLETED_FAILURE'
            ) {
                return;
            }

            if (e.key === 'Backspace') {
                e.preventDefault();
                mainGameStore.backspace();
                return;
            }

            if (e.key === 'Enter') {
                if (!randomWord) {
                    return;
                }

                mainGameStore.submitWord({ words, selectedWord: randomWord });
                return;
            }

            if (e.key.length !== 1) {
                return;
            }
            if (!/^[a-zA-Zа-яА-ЯёЁ]$/.test(e.key)) {
                return;
            }

            mainGameStore.typeLetter(e.key.toUpperCase());
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [mainGameStore, wordleStore, words, randomWord]);

    return (
        <section className={styles.mainGame}>
            <div className={globalStyle.container}>
                <GameButtonList />
            </div>
        </section>
    );
});
