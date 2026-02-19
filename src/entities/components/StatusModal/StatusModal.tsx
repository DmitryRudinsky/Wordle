import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import Cross from '@/shared/assets/cross.svg?react';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';
import { GameStatus } from '@/widgets/interface/mainGame.ts';

import styles from './StatusModal.module.scss';

interface ModalStatusProps {
    gameStatus: GameStatus | null;
}

export const ModalStatus: React.FC<ModalStatusProps> = observer(({ gameStatus }) => {
    const { wordleStore, modalStore } = useStores();
    const { randomWord } = wordleStore;
    const { isStatusModalActive } = modalStore;
    const isGameFinished =
        gameStatus === 'COMPLETED_FAILURE' || gameStatus === 'COMPLETED_SUCCESSFUL';

    useEffect(() => {
        modalStore.setStatusModalActive(isGameFinished);
    }, [isGameFinished, modalStore]);

    if (!isGameFinished) {
        return;
    }

    const handleTryAgain = () => {
        wordleStore.restartGame();
        modalStore.closeStatusModal();
    };

    const title = gameStatus === 'COMPLETED_SUCCESSFUL' ? 'Победа!' : 'Поражение!';

    return (
        <Modal active={isStatusModalActive} setActive={modalStore.setStatusModalActive}>
            <div>
                <div className={styles.successModalHeader}>
                    <h5 className={styles.successModalTitle}>{title}</h5>
                    <button
                        className={styles.successModalCloseButton}
                        onClick={modalStore.closeStatusModal}
                    >
                        <Cross />
                    </button>
                </div>
                <div className={styles.successModalBody}>
                    {gameStatus === 'COMPLETED_FAILURE' && (
                        <div className={styles.successModalSuggest}>
                            <h6 className={styles.successModalSuggestTitle}>Ответ был:</h6>
                            <div className={styles.successModalSuggestWord}>{randomWord}</div>
                        </div>
                    )}
                    <button className={styles.successModalTryAgainButton} onClick={handleTryAgain}>
                        ЕЩЁ РАЗ
                    </button>
                    <p className={styles.successModalHint}>
                        Или нажмите &rdquo;Enter&rdquo;, чтобы начать снова
                    </p>
                </div>
            </div>
        </Modal>
    );
});
