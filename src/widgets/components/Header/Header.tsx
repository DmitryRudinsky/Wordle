import React from 'react';

import { HeaderButtonList } from '@/entities/HeaderButtonList/HeaderButtonList.tsx';
import global from '@/shared/global_styles/_global.module.scss';
import styles from '@/widgets/components/Header/Header.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={global.container}>
                <HeaderButtonList />
            </div>
        </header>
    );
};
