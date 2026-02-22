import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useStores } from '@/app/hooks/useStores.ts';
import { lang, SUPPORTED_LANGS } from '@/app/interfaces/wordle.ts';
import Flag from '@/entities/components/HeaderButtonList/assets/RU.svg?react';
import global from '@/shared/global_styles/_global.module.scss';
import { Clue } from '@/shared/ui/Clue/Clue.tsx';
import styles from '@/widgets/components/Dictionary/Dictionary.module.scss';

const LANG_LABELS: Record<lang, string> = {
    en: 'English',
    uk: 'Українська',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    pt: 'Português',
    it: 'Italiano',
    nl: 'Nederlands',
    ru: 'Русский',
    pl: 'Polski',
    sv: 'Svenska',
    tr: 'Türkçe',
    id: 'Indonesian',
    cs: 'Čeština',
    fi: 'Suomi',
};

export const Dictionary: React.FC = observer(() => {
    const { wordleStore } = useStores();
    const navigate = useNavigate();

    const handleLanguageChange = (language: lang) => {
        navigate(`/${language}`);
    };

    return (
        <div className={styles.dictionary}>
            <div className={global.container}>
                <div className={styles.dictionaryInner}>
                    <Clue>Dictionary</Clue>
                    <p>Выбрать словарь</p>
                    <div className={styles.languageGrid}>
                        {SUPPORTED_LANGS.map((language) => (
                            <button
                                onClick={() => handleLanguageChange(language)}
                                type='button'
                                className={classNames(
                                    styles.languageButton,
                                    wordleStore.language === language &&
                                        styles.languageButtonSelected,
                                )}
                                key={language}
                            >
                                <Flag className={styles.flag} />
                                <span>{LANG_LABELS[language]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
