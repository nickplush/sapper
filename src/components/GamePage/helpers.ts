export const findAndUpdateNearestCells = (index: number, size: number, array: any[], isItBomb: boolean): void => {
    const positions = [
        index - (size + 1),
        index - (size),
        index - (size - 1),
        index + 1,
        index - 1,
        index + (size + 1),
        index + (size),
        index + (size - 1),
    ]
    const filteredPositions = positions.filter(item => array[item] && Math.abs(array[item].x - array[index].x) <= 1 && !array[item].isOpen)
    filteredPositions.forEach(position => {
        if (isItBomb) {
            array[position].bombNumber++
        } else {
            array[position].isOpen = true
            if (array[position].bombNumber === 0) {
                findAndUpdateNearestCells(position, size, array, false)
            }
        }
    })
}

export const formatTime = (timer: number) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = Math.floor(timer / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
}
export const generateGridStyle = (size: number) => ({
    height: '90vh',
    width: '90vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    gridColumnGap: 0,
    gridRowGap: 0,
})