import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import { ChallengeModal } from '@/entities/components/ChallengeModal/ChallengeModal.tsx';
import { GameButtonList } from '@/entities/components/GameButtonList/GameButtonList.tsx';
import { GiveUpModal } from '@/entities/components/GiveUpModal/GiveUpModal.tsx';
import { KeyBoard } from '@/entities/components/KeyBoard/KeyBoard.tsx';
import { ModalStatus } from '@/entities/components/StatusModal/StatusModal.tsx';
import globalStyle from '@/shared/global_styles/_global.module.scss';

import styles from './MainGame.module.scss';

export const MainGame: React.FC = observer(() => {
    const { mainGameStore, wordleStore, modalStore } = useStores();
    const { mapOfWords: words, randomWord, regularExpression } = wordleStore;
    const justRestartedRef = React.useRef(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            if (
                mainGameStore.gameStatus === 'COMPLETED_SUCCESSFUL' ||
                mainGameStore.gameStatus === 'COMPLETED_FAILURE'
            ) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    justRestartedRef.current = true;
                    setTimeout(() => {
                        justRestartedRef.current = false;
                    }, 500);
                    wordleStore.restartGame();
                    modalStore.closeStatusModal();
                }
                return;
            }

            if (justRestartedRef.current) {
                e.preventDefault();
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
            if (!regularExpression.test(e.key)) {
                return;
            }

            mainGameStore.typeLetter(e.key.toUpperCase());
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [mainGameStore, wordleStore, words, randomWord, regularExpression, modalStore]);

    return (
        <section className={styles.mainGame}>
            <div className={globalStyle.container}>
                <GameButtonList />
                <ModalStatus />
                <GiveUpModal />
                <ChallengeModal />
                <KeyBoard />
            </div>
        </section>
    );
});
