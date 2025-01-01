import React, {useState} from 'react';
import ButtonList from "../../entities/ButtonList/ButtonList.tsx";
import styles from './Header.module.scss'

const Header: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const Switch = () => {
        setIsPlaying(prev => !prev);
    }

    return (
        <header className={styles['header']}>
            <ButtonList isPlaying={isPlaying} country='RU'/>
            <button onClick={Switch}>ЗАЛУПА</button>
        </header>
    );
};

export default Header;