import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { isLang } from '@/app/interfaces/wordle';
import { wordleStore } from '@/app/store/wordleStore';

export const LangGate = observer(() => {
    const { lang } = useParams();

    if (!isLang(lang)) {
        return;
    }

    useEffect(() => {
        if (wordleStore.language !== lang) {
            wordleStore.setLanguage(lang);
            void wordleStore.getDictionary();
        }
    }, [lang]);

    return <Outlet />;
});
