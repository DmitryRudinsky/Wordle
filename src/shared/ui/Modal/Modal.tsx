import classNames from 'classnames';
import React, { useEffect } from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
    active: boolean;
    setActive?: (state: boolean) => void;
    onClose?: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ active, setActive, onClose, children }) => {
    const closeModal = () => {
        setActive?.(false);
    };

    useEffect(() => {
        if (!active) {
            onClose?.();
        }
    }, [active, onClose]);

    return (
        <div className={classNames(styles.modal, active && styles.active)} onClick={closeModal}>
            <div
                className={classNames(styles.modalContent, active && styles.active)}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
