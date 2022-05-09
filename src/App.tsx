import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useState} from "react";
import MaimMenu from "./components/MainMenu/MainMenu";
import GamePage from "./components/GamePage/GamePage";

export interface MyOptionType {
    value: string | number;
    label: string
};

const App = () => {
    const [size, setSize] = useState({value: 7, label: '7х7'})
    const [difficulty, setDifficulty] = useState({value: 6, label: 'MEDIUM'})

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                       element={
                           <MaimMenu
                               changeSize={setSize}
                               changeDifficulty={setDifficulty}
                               size={size}
                               difficulty={difficulty}
                           />
                       }
                />
                <Route path="game"
                       element={
                           <GamePage
                               size={size.value}
                               difficulty={difficulty.value}
                           />
                       }/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;