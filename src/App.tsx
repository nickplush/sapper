import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MaimMenu from "./components/MainMenu/MainMenu";
import GameField from "./components/GameField/GameField";
import {useState} from "react";

export interface MyOptionType {
    value: string | number;
    label: string
};

const App = () => {
    const [size, setSize] = useState({value: 7, label: '7х7'})
    const [difficulty, setDifficulty] = useState({value: 'MEDIUM', label: 'MEDIUM'})

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MaimMenu
                            changeSize={setSize}
                            changeDifficulty={setDifficulty}
                            size={size}
                            difficulty={difficulty}
                        />
                    }
                />
                <Route
                    path="game"
                    element={
                        <GameField
                            size={size.value}
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