import React from 'react';
import classes from './Settings.module.scss'
import global from '../../shared/global_styles/_global.module.scss'
import Clue from "../../shared/ui/Clue/Clue";

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
    setLettersCount: React.Dispatch<React.SetStateAction<number>>;
    lettersCount: number;
}

const Settings: React.FC<SettingsInterface> = ({setWindow, setLettersCount, lettersCount}) => {
    return (
        <div className={classes.settings}>
            <div className={global.container}>
                <div className={classes.settingsInner}>
                    <Clue setWindow={setWindow}>Settings</Clue>
                    <p>Number of Letters</p>
                    {Array.from({ length: 8 }, (_, index) => (
                        <button onClick={() => setLettersCount(index + 4)} type={"button"} className={lettersCount === index + 4 ? classes.settingsButtonSelected : classes.settingsButton} key={index}>{index + 4}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Settings;