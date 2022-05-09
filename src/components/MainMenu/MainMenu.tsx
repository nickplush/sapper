import Select from 'react-select';
import React from "react";
import {MyOptionType} from "../../App";
import {Link} from "react-router-dom";
import {gameDifficultyOptions, sizeOptions} from "./constants";
import './MainMenu.css'
import Record from "../Records/Records";

interface MaimMenuProps {
    changeDifficulty: (value: any) => void,
    changeSize: (value: any) => void,
    size: MyOptionType,
    difficulty: MyOptionType
}

const MaimMenu: React.FC<MaimMenuProps> = ({changeDifficulty, changeSize, size, difficulty}) => (
    <div className='page-container'>
        <div className='menu-wrapper'>
            <div>
                <div>
                    <Select
                        value={difficulty}
                        options={gameDifficultyOptions}
                        onChange={changeDifficulty}
                        className='menu-item'
                    />
                </div>
                <div>
                    <Select
                        value={size}
                        options={sizeOptions}
                        onChange={changeSize}
                        className='menu-item'
                    />
                </div>
                <Link to="game/" className='link play-button'>
                    <div className='play-button'>
                        PLAY
                    </div>
                </Link>
                <div>
                    <Record/>
                </div>
            </div>
        </div>
    </div>
)
export default MaimMenu
