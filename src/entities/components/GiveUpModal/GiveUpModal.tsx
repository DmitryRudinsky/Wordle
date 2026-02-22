import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import Cross from '@/shared/assets/cross.svg?react';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';

import styles from './GiveUpModal.module.scss';

export const GiveUpModal: React.FC = observer(() => {
    const { modalStore, mainGameStore } = useStores();
    const { isGiveUpModalActive } = modalStore;
    const timeoutIdRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleConfirm = () => {
        if (!isGiveUpModalActive || mainGameStore.gameStatus !== 'STARTED') {
            return;
        }

        mainGameStore.setGameStatus('COMPLETED_FAILURE');
        modalStore.closeGiveUpModal();

        if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            if (mainGameStore.gameStatus === 'COMPLETED_FAILURE') {
                modalStore.setStatusModalActive(true);
            }
            timeoutIdRef.current = null;
        }, 100);
    };

    const handleCancel = () => {
        modalStore.closeGiveUpModal();
    };

    return (
        <Modal active={isGiveUpModalActive} setActive={modalStore.setGiveUpModalActive}>
            <div>
                <div className={styles.giveUpModalHeader}>
                    <h5 className={styles.giveUpModalTitle}>Вы уверены?</h5>
                    <button
                        className={styles.giveUpModalCloseButton}
                        onClick={modalStore.closeGiveUpModal}
                    >
                        <Cross />
                    </button>
                </div>
                <div className={styles.giveUpModalBody}>
                    <p className={styles.giveUpModalText}>
                        Вы действительно хотите сдаться? Загаданное слово будет показано.
                    </p>
                    <div className={styles.giveUpModalButtons}>
                        <button className={styles.giveUpModalConfirmButton} onClick={handleConfirm}>
                            Да
                        </button>
                        <button className={styles.giveUpModalCancelButton} onClick={handleCancel}>
                            Нет
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
});
