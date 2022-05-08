import Select from 'react-select';
import React from "react";
import {MyOptionType} from "../../App";
import {Link} from "react-router-dom";
import {gameDifficultyOptions, sizeOptions} from "./constants";

interface MaimMenuProps {
    changeDifficulty: (value: any) => void,
    changeSize: (value: any) => void,
    size: MyOptionType,
    difficulty: MyOptionType
}

const MaimMenu: React.FC<MaimMenuProps> = ({changeDifficulty, changeSize, size,difficulty}) => (
        <div>
            <Select
                value={difficulty}
                options={gameDifficultyOptions}
                onChange={changeDifficulty}
            />
            <Select
                value={size}
                options={sizeOptions}
                onChange={changeSize}
            />
            <Link to="game/">PLAY</Link>
        </div>
    )
export default MaimMenu
