import React, {useState ,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Line } from 'rc-progress';
import {SECTIONS_DATA} from './data'
import _ from 'lodash'
import './style.sass'


export default function Progress(){
  const [isVisible, setVisible] = useState(false)

  const dataOfState = useSelector((state)=> state.diag.subsections)

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
          {SECTIONS_DATA.map(section=>{
            console.log(section.sectionCount)
            const count = getCountOfCompleted(dataOfState[section.name])
            const percent = count / section.sectionCount * 100
            return (
              <li key={section.name}>
              <span className="progress__title">{section.title}</span>
              <Line
                percent={percent.toFixed(0)}
                trailWidth="4"
                strokeWidth="4"
                strokeColor="#a32f37"
                trailColor="#fff"
                strokeLinecap="square"
                className="progress__line_main"
              />
              </li>
            )
          })
          }
        </ul>

      </div> : null }
      <span className="progress__title">Прогресс: </span>
      {/*<Line percent={countOfPercent} strokeColor="#D3D3D3" />*/}
      <Line
        percent="50"
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

function getCountOfCompleted(result) {
    if (Array.isArray(result)) return result.length

    if (typeof result === 'string' && result.length > 0) return 1

    let count = 0
    for(let i of Object.values(result)){
        count = count + getCountOfCompleted(i)
    }
    return count
}


