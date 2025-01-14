import React from 'react';
import classes from './Question.module.scss'
import global from '../../shared/global_styles/_global.module.scss'
import Clue from "../../shared/ui/Clue/Clue";

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<SettingsInterface> = ({setWindow}) => {
    return (
        <div className={classes.question}>
            <div className={global.container}>
                <div className={classes.questionInner}>
                    <Clue setWindow={setWindow}>Question</Clue>
                </div>
            </div>
        </div>
    );
};

export default Settings;