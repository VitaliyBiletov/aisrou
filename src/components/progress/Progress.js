import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {getCountOfCompleted} from './selectors'
import './style.sass'

export default function Progress(){
  const dataOfSubsections = useSelector((state)=> state.diag.subsections)
  const count = getCountOfCompleted(dataOfSubsections)
  return(
    <div className="progress">
      <span>Прогресс заполнения: </span>
      <progress className="progress__bar" max="100" value={count} />
    </div>
  )
}


