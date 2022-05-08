import React from "react";

interface IButtonProps {
    size: number,
}

const GameField: React.FC<IButtonProps> = ({size}) => {
    return (<>{size}</>)
}

export default GameField