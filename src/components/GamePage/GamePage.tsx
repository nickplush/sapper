import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react"
import {BiRefresh} from "react-icons/bi";
import {AiFillHome} from "react-icons/ai";
import Field from "../Field/Field";
import {findAndUpdateNearestCells, formatTime} from "./helpers";
import './GamePage.css'

interface GameFieldProps {
    size: number,
    difficulty: number
}

export interface Cell {
    x: number,
    y: number,
    isBomb: boolean,
    isOpen: boolean,
    bombNumber: number,
    isFlag: boolean
}

const GamePage: React.FC<GameFieldProps> = ({size, difficulty}) => {
    const fieldSize = Math.pow(size, 2)
    const [arrayOfCells, setArrayOfCells] = useState<Cell[]>([])
    const [time, setTime] = useState<number>(0)
    const countRef = React.useRef<any>(null)
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
    const [isGameEnding, setIsGameEnding] = useState(false)

    useEffect(() => {
        generateField()
        return clearInterval(countRef.current)
    }, [])

    useEffect(() => {
        if (arrayOfCells.length) {
            const isGameEnd = arrayOfCells.some(item => !item.isFlag && !item.isBomb && !item.isOpen)
            if (!isGameEnd && !isGameEnding) {
                endGame(true)
            }
        }
    }, [arrayOfCells])


    const handleStart = () => {
        countRef.current = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)

    }
    const restartGame = () => {
        setIsGameEnding(false)
        generateField()
        setIsGameStarted(false)
        setTime(0)
        clearInterval(countRef.current)
    }

    const saveRecord = () => {
        const oldRecord: number | null = localStorage.record
        if (!oldRecord || oldRecord < time) {
            localStorage.record = time
        }
    }

    const endGame = (isWin: boolean) => {
        if (isWin) {
            saveRecord()
        }
        setIsGameEnding(true)
        openField()
        clearInterval(countRef.current)
    }

    const generateField = () => {
        const newFieldArr: Cell[] = []
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                newFieldArr.push({x, y, bombNumber: 0, isBomb: false, isOpen: false, isFlag: false})
            }
        }
        generateBombs(newFieldArr)
        setArrayOfCells(newFieldArr)
    }

    const generateBombs = (fieldArray: Cell[]) => {
        let bombsCounter = Math.ceil(fieldSize / difficulty)
        while (bombsCounter) {
            const index = Math.floor(Math.random() * fieldSize)
            if (!fieldArray[index].isBomb) {
                fieldArray[index].isBomb = true
                findAndUpdateNearestCells(index, size, fieldArray, true)
                bombsCounter--
            }
        }
    }

    const clickOnCell = (index: number) => {
        if (!arrayOfCells[index].isFlag) {
            if (arrayOfCells[index].isBomb || isGameEnding) {
                endGame(false)
            } else {
                if (!isGameStarted) {
                    setIsGameStarted(true)
                    handleStart()
                }
                const cells = [...arrayOfCells]
                arrayOfCells[index].isOpen = true
                if (arrayOfCells[index].bombNumber === 0) {
                    findAndUpdateNearestCells(index, size, cells, false)
                }
                setArrayOfCells(cells)
            }
        }
    }

    const setOrDropFlag = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (!isGameEnding) {
            const cells = [...arrayOfCells]
            cells[index].isFlag = !cells[index].isFlag
            setArrayOfCells(cells)
        }
    }

    const openField = () => {
        const field = [...arrayOfCells].map(item => ({...item, isOpen: (item.isBomb && !item.isFlag) || item.isOpen}))
        setArrayOfCells(field)
    }

    return (
        <div className='page-container'>
            <Field clickOnCell={clickOnCell} setOrDropFlag={setOrDropFlag} arrayOfCells={arrayOfCells} size={size}/>
            <div className='options-menu-container'>
                <div>{formatTime(time)}</div>
                <div className='refresh-button'>
                    <BiRefresh size={'100%'} onClick={restartGame}/>
                </div>
                <Link to={'/'} className='refresh-button'>
                    <AiFillHome size={'100%'} onClick={restartGame}/>
                </Link>
            </div>
        </div>
    )
}

export default GamePage