import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useStores } from '@/app/hooks/useStores.ts';
import Cross from '@/shared/assets/cross.svg?react';
import { Modal } from '@/shared/ui/Modal/Modal.tsx';

import styles from './ChallengeModal.module.scss';

export const ChallengeModal: React.FC = observer(() => {
    const { modalStore } = useStores();
    const { isChallengeModalActive } = modalStore;
    const [word, setWord] = useState('');

    const handleCopyLink = () => {
        // TODO: Implement copy link functionality
    };

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value);
    };

    return (
        <Modal active={isChallengeModalActive} setActive={modalStore.setChallengeModalActive}>
            <div>
                <div className={styles.challengeModalHeader}>
                    <h5 className={styles.challengeModalTitle}>Генератор испытаний</h5>
                    <button
                        className={styles.challengeModalCloseButton}
                        onClick={modalStore.closeChallengeModal}
                    >
                        <Cross />
                    </button>
                </div>
                <div className={styles.challengeModalBody}>
                    <p className={styles.challengeModalText}>
                        Брось вызов другу с любым словом от 4 до 11 букв:
                    </p>
                    <input
                        type='text'
                        className={styles.challengeModalInput}
                        value={word}
                        onChange={handleWordChange}
                        placeholder='Введите слово'
                        maxLength={11}
                    />
                    <button className={styles.challengeModalCopyButton} onClick={handleCopyLink}>
                        Скопировать ссылку
                    </button>
                </div>
            </div>
        </Modal>
    );
});
