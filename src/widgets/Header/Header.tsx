import React, {useState} from 'react';
import HeaderButtonList from "../../entities/HeaderButtonList/HeaderButtonList.tsx";
import styles from './Header.module.scss'
import global from "../../shared/global_styles/_global.module.scss"

interface Header {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
    window: string;
}

const Header: React.FC<Header> = ({setWindow, window}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (
        <header className={styles.header}>
            <div className={global.container}>
                <HeaderButtonList setWindow={setWindow} window={window} isPlaying={isPlaying} country='RU'/>
            </div>
        </header>
    );
};

export default Header;