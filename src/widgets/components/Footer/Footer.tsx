import React from 'react';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <p className={styles.footerText}>
                    Сделал <strong>Гула Дмитрий</strong>
                </p>
                <p className={styles.footerYear}>© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
};
