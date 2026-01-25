import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { useStores } from '@/app/hooks/useStores.ts';
import { isLang } from '@/app/interfaces/wordle';

export const LangGate = observer(() => {
    const { lang } = useParams();
    const { wordleStore } = useStores();

    if (!isLang(lang)) {
        return;
    }

    useEffect(() => {
        if (wordleStore.language !== lang) {
            wordleStore.setLanguage(lang);
            void wordleStore.getDictionary();
        }
    }, [lang, wordleStore]);

    return <Outlet />;
});
