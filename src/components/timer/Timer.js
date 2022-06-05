import React, {useState} from 'react'
import {Circle} from "rc-progress";
import useSound from 'use-sound'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStop, faPlay} from '@fortawesome/free-solid-svg-icons'
import soundStop from '../../sounds/stop.mp3'

export default function Timer() {
    const [intervalId, setIntervalId] = useState(null)
    const [color, setColor] = useState('#6458a7')
    const [sec, setSec] = useState(0)
    const [play] = useSound(soundStop)
    const time = 2

    const startTimer = (e) => {
        setColor('#6458a7')
        setSec(0)
        let timer = 0
        if (!intervalId) {
            const intervalId = setInterval((e) => {
                timer++
                if (timer === time) {
                    setSec(100)
                    setColor('#228325')
                    setIntervalId(null)
                    play()
                    return clearInterval(intervalId)
                }
                setSec(sec => sec + 100 / time)
            }, 1000)
            setIntervalId(intervalId)
        }
    }

    const stopTimer = (e) => {
        setSec(0)
        setColor('#6458a7')
        clearInterval(intervalId)
    }

    return (
        <div className='analysis__timer timer'>
            <div className="timer__container">
                <button className='timer__button timer__button_start status__btn-point' onClick={startTimer}>
                    <FontAwesomeIcon icon={faPlay}/>
                </button>
                <button className='timer__button timer__button_stop status__btn-point' onClick={stopTimer}>
                    <FontAwesomeIcon icon={faStop}/>
                </button>
                <div className="timer__progress">
                    <Circle percent={sec} strokeWidth="7" strokeColor={color}/>
                </div>
            </div>
        </div>
    )

}