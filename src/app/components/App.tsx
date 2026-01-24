import { useEffect, useState } from "react";
import { Header } from "@/widgets/Header/Header";
import { MainGame } from "@/widgets/MainGame/MainGame";
import { Settings } from "@/widgets/Settings/Settngs";
import { Dictionary } from "@/widgets/Dictionary/Dictionary";
import { AddWord } from "@/widgets/AddWord/AddWord";
import { Stats } from "@/widgets/Stats/Stats";
import { Question } from "@/widgets/Question/Question";
import axios from "axios";

export const App = () => {
    const [window, setWindow] = useState<string>('game');
    const [lettersCount, setLettersCount] = useState<number>(5);
    const [dictionary, setDictionary] = useState<string[]>([]);
    const [, setSelectedWord] = useState<string>('');

    const getData = async () => {
        try {
            const response = await axios.get('/api/files/wordle/ru/dictionary.json?v44.19');
            setDictionary(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const mapOfWords = new Map<number, string[]>();
        dictionary.forEach((word) => {
            const length: number = word.length;
            if (mapOfWords.has(length)) {
                const arr = mapOfWords.get(length) ?? [];
                arr.push(word);
                mapOfWords.set(length, arr);
            } else {
                mapOfWords.set(length, [word]);
            }
        });

        const selectedDictionary = mapOfWords.get(lettersCount);
        if (selectedDictionary) {
            const word = selectedDictionary[Math.floor(Math.random() * selectedDictionary.length)];
            setSelectedWord(word);
        }
    }, [dictionary, lettersCount]);

    return (
        <main className='main'>
            <Header setWindow={setWindow} window={window} />
            {window === 'game' && <MainGame lettersCount={lettersCount} />}
            {window === 'dictionary' && <Dictionary setWindow={setWindow} />}
            {window === 'add' && <AddWord setWindow={setWindow} />}
            {window === 'giveUp' && <p>giveUp</p>}
            {window === 'stats' && <Stats setWindow={setWindow} />}
            {window === 'settings' && <Settings setWindow={setWindow} setLettersCount={setLettersCount} lettersCount={lettersCount} />}
            {window === 'question' && <Question setWindow={setWindow} />}
        </main>
    );
};
