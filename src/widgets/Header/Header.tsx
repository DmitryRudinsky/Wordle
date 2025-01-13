import React, {useState} from 'react';
import ButtonList from "../../entities/ButtonList/ButtonList.tsx";
import styles from './Header.module.scss'
import global from "../../shared/global_styles/_global.module.scss"

const Header: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const Switch = () => {
        setIsPlaying(prev => !prev);
    }

    return (
        <header className={styles.header}>
            <div className={global.container}>
                <ButtonList isPlaying={isPlaying} country='RU'/>
                <button onClick={Switch}>ЗАЛУПА</button>
            </div>
        </header>
    );
};

export default Header;