import {useState} from "react";
import Header from "../widgets/Header/Header.tsx";
import MainGame from "../widgets/MainGame/MainGame";
import Settings from "../widgets/Settings/Settngs";
import Dictionary from "../widgets/Dictionary/Dictionary";
import AddWord from "../widgets/AddWord/AddWord";
import Stats from "../widgets/Stats/Stats";
import Question from "../widgets/Question/Question";



function App() {
    const [window, setWindow] = useState<string>('game');
    const [lettersCount, setLettersCount] = useState<number>(5)


    return (
        <main className='main'>
            <Header setWindow={setWindow} window={window}/>
            {window === 'game' && <MainGame lettersCount={lettersCount}/>}
            {window === 'dictionary' && <Dictionary setWindow={setWindow}/>}
            {window === 'add' && <AddWord setWindow={setWindow}/>}
            {window === 'giveUp' && <p>giveUp</p>}
            {window === 'stats' && <Stats setWindow={setWindow}/>}
            {window === 'settings' && <Settings setWindow={setWindow} setLettersCount={setLettersCount} lettersCount={lettersCount}/>}
            {window === 'question' && <Question setWindow={setWindow}/>}
        </main>
    )
}

export default App
