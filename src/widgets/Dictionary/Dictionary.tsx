import React from 'react';
import classes from './Dictionary.module.scss'
import global from '../../shared/global_styles/_global.module.scss'
import Clue from "../../shared/ui/Clue/Clue";

interface SettingsInterface {
    setWindow: React.Dispatch<React.SetStateAction<string>>;
}

const Dictionary: React.FC<SettingsInterface> = ({setWindow}) => {
    return (
        <div className={classes.dictionary}>
            <div className={global.container}>
                <div className={classes.dictionaryInner}>
                    <Clue setWindow={setWindow}>Dictionary</Clue>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;