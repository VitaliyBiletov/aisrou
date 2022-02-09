import React from 'react'
import {useNavigate} from 'react-router-dom'
import {DIAGNOSTIC_ROUTE} from "../../utils/const"

export default function Admin(){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(DIAGNOSTIC_ROUTE)
    }
    return(
        <div>
            <p>Админка</p>
            <button onClick={handleClick}>Перейти диаг</button>
        </div>

    )
}