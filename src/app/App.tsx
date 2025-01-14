import Header from "../widgets/Header/Header.tsx";
import MainGame from "../widgets/MainGame/MainGame";
import {useState} from "react";



function App() {
    const [window, setWindow] = useState<string>('game');


    return (
        <main className='main'>
            <Header setWindow={setWindow} window={window}/>
            {window === 'game' && <MainGame/>}
            {window === 'dictionary' && <p>dictionary</p>}
            {window === 'add' && <p>add</p>}
            {window === 'giveUp' && <p>giveUp</p>}
            {window === 'stats' && <p>stats</p>}
            {window === 'settings' && <p>settings</p>}
            {window === 'question' && <p>question</p>}
        </main>
    )
}

export default App
