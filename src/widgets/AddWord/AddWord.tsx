import React from 'react';
import classes from './AddWord.module.scss'
import global from '../../shared/global_styles/_global.module.scss'
import Clue from "../../shared/ui/Clue/Clue";

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<SettingsInterface> = ({setWindow}) => {
    return (
        <div className={classes.AddWord}>
            <div className={global.container}>
                <div className={classes.AddWordInner}>
                    <Clue setWindow={setWindow}>Add Word</Clue>
                </div>
            </div>
        </div>
    );
};

export default Settings;