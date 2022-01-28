import React, {useState ,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getCountOfCompleted} from './selectors'
import LexicData from '../../pages/diag/sections/lexis/lexisData'
import SensmotorData from '../../pages/diag/sections/sensmotor/sensmotorData'
import grammaticData from '../../pages/diag/sections/grammatic/grammaticData'
import Fields from '../../pages/diag/sections/stateFunc/Fields'
import { Line } from 'rc-progress';
import './style.sass'

const sectionsData = [LexicData, SensmotorData, grammaticData]

export default function Progress(){
  const [isVisible, setVisible] = useState(false)
  const dataOfSubsections = useSelector((state)=> state.diag.subsections)
  const count = getCountOfCompleted(dataOfSubsections)
  const [countAll, setCountAll] = useState(0)
  useEffect(()=>{
    let c = 0
    sectionsData.forEach(s=>{
      s.forEach(d=>c = c + d.data.length)
    })
    setCountAll(c + Fields.length)
    },[])
  const countOfPercent = count && countAll ? count/countAll * 100 : 0

  const handleMouseOver = (e) => {
    setVisible(true)
  }

  const handleMouseOut = (e) => {
    setVisible(false)
  }

  return(
    <div
      className="progress"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
     >
      {isVisible ?
      <div
        className="progress__info animate__animated animate__slideInUp"
      >
        <ul className="progress__list">
          <li className="progress__item">
            <span className="progress__text">Состояние функций</span>
            <Line
              percent={countOfPercent}
              trailWidth="4"
              strokeWidth="4"
              strokeColor="#a32f37"
              trailColor="#fff"
              strokeLinecap="square"
            />
          </li>
          <li className="progress__item">
            <span className="progress__text">Сенсо-моторный уровень</span>
            <Line
              percent={countOfPercent}
              trailWidth="4"
              strokeWidth="4"
              strokeColor="#a32f37"
              trailColor="#fff"
              strokeLinecap="square"
            />
          </li>
          <li className="progress__item">
            <span className="progress__text">Грамматика</span>
            <Line
              percent={countOfPercent}
              trailWidth="4"
              strokeWidth="4"
              strokeColor="#a32f37"
              trailColor="#fff"
              strokeLinecap="square"
            />
          </li>
          <li className="progress__item">
            <span className="progress__text">Лексика</span>
            <Line
              percent={countOfPercent}
              trailWidth="4"
              strokeWidth="4"
              strokeColor="#a32f37"
              trailColor="#fff"
              strokeLinecap="square"
            />
          </li>
        </ul>

      </div> : null }
      <span className="progress__title">Прогресс: </span>
      {/*<Line percent={countOfPercent} strokeColor="#D3D3D3" />*/}
      <Line
        percent={countOfPercent}
        trailWidth="4"
        strokeWidth="4"
        strokeColor="#a32f37"
        trailColor="#fff"
        strokeLinecap="square"
        className="progress__line_main"
      />
      {/*label={`${countOfPercent.toFixed(0)}%`}*/}
      <div className='container' />
    </div>
  )
}

function getCountAll(arr){

}


