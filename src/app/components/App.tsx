import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '@/widgets/components/Footer/Footer.tsx';
import { Header } from '@/widgets/components/Header/Header';

import styles from './App.module.scss';

export const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.appContent}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
