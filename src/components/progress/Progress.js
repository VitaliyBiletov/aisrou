import React, {useState ,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Line } from 'rc-progress';
import {SECTIONS_DATA} from './data'
import _ from 'lodash'
import './style.sass'


export default function Progress(){
  const [isVisible, setVisible] = useState(false)
  const [percentAll, setPercentAll] = useState(0)

  const dataOfState = useSelector((state)=> {
    const subsections = state.diag.subsections
    const sectionsData = SECTIONS_DATA.map(section=>{
      const count = getCountOfCompleted(subsections[section.name])
      const percent = count / section.sectionCount * 100
      return {name: section.name, title: section.title, percent: percent.toFixed(0)}
      // setCountCompletedAll(countCompletedAll + count)
    })
    const countCompletedAll = sectionsData.reduce((sum, sec) => sum + Number(sec.percent), 0) / sectionsData.length
    if (percentAll !== countCompletedAll)
      setPercentAll(countCompletedAll)
    return sectionsData
  })

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
          {dataOfState.map(section=>
              <li className="progress__item" key={section.name}>
              <span className="progress__title">{section.title}</span>
              <Line
                percent={section.percent}
                trailWidth="4"
                strokeWidth="4"
                strokeColor="#a32f37"
                trailColor="#f7e3e5"
                strokeLinecap="square"
                className="progress__line_main"
              />
              </li>
          )
          }
        </ul>

      </div> : null }
      <span className="progress__title_main">Прогресс: </span>
      {/*<Line percent={countOfPercent} strokeColor="#D3D3D3" />*/}
      <Line
        percent={percentAll}
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


