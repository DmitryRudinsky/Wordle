import React, { useState } from 'react';

import { HeaderButtonList } from '../../entities/HeaderButtonList/HeaderButtonList';
import global from '../../shared/global_styles/_global.module.scss';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
    const [isPlaying] = useState<boolean>(false);

    return (
        <header className={styles.header}>
            <div className={global.container}>
                <HeaderButtonList isPlaying={isPlaying} country='RU' />
            </div>
        </header>
    );
};
