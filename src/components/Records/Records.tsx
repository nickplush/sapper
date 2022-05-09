import {formatTime} from "../GamePage/helpers";
import './Rrecord.css'

const Record = () => {
    const record: number | null = localStorage.record
    return (
        <div className='record'>
            <div className='title'>
                <h2>RECORD</h2>
            </div>
            <div className='content'>
                <h1>{record ? formatTime(record) : 'No records'}</h1>
            </div>
        </div>
    )
}
export default Record