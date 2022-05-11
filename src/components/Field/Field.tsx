import classNames from "classnames";
import React from "react";
import {GiUnlitBomb} from "react-icons/gi";
import {Cell} from "../GamePage/GamePage";
import {generateGridStyle} from "../GamePage/helpers";
import {FaFlag} from "react-icons/fa";
import './Field.css'


interface Field {
    clickOnCell: (index: number) => void,
    setOrDropFlag: (index: number, e: React.MouseEvent<HTMLDivElement>) => void
    arrayOfCells: Cell[],
    size: number
}

const Field: React.FC<Field> = ({clickOnCell, arrayOfCells, size, setOrDropFlag}) => {
    return (
        <div style={generateGridStyle(size)}>
            {arrayOfCells.map((cell, i) =>
                <div key={i} className='container'>
                    <div className='cell' onClick={() => clickOnCell(i)} onContextMenu={(e) => setOrDropFlag(i, e)}>
                        <div className={`mask mask_${(cell.x + cell.y) % 2}`}/>
                        <div className={classNames({
                            hidden: !cell.isOpen,
                            open: cell.isOpen,
                        })}>
                            {cell.isOpen
                                ? <>
                                    {cell.isBomb
                                        ? (<GiUnlitBomb/>)
                                        : (
                                            <div className={`cell number_${cell.bombNumber > 4 ? 4 : cell.bombNumber}`}>
                                                {cell.bombNumber || ''}
                                            </div>
                                        )
                                    }
                                </>
                                : (
                                    <div className='cell'>
                                        {cell.isFlag ? <FaFlag size={'70%'} color={'red'}/> : ''}
                                    </div>
                                )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Field
