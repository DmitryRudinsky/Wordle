import { observer } from 'mobx-react';
import React from 'react';

import { useStores } from '@/app/hooks/useStores.ts';

import global from '../../shared/global_styles/_global.module.scss';
import { Clue } from '../../shared/ui/Clue/Clue';
import classes from './Settings.module.scss';

export const Settings: React.FC = observer(() => {
    const { wordleStore } = useStores();
    return (
        <div className={classes.settings}>
            <div className={global.container}>
                <div className={classes.settingsInner}>
                    <Clue>Settings</Clue>
                    <p>Number of Letters</p>
                    {Array.from({ length: 8 }, (_, index) => (
                        <button
                            onClick={() => wordleStore.setLettersNumber(index + 4)}
                            type='button'
                            className={
                                wordleStore.lettersNumber === index + 4
                                    ? classes.settingsButtonSelected
                                    : classes.settingsButton
                            }
                            key={index}
                        >
                            {index + 4}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
