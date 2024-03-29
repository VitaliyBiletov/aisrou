import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setProgress} from '../../redux/actions/infoActions'
import { Line } from 'rc-progress';
import {TASKS_COUNT} from './progressData'
import {getCountOfCompleted} from './progressUtils'


export default function Progress(){
  const [isVisible, setVisible] = useState(false)
  const [percentAll, setPercentAll] = useState(0)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setProgress(percentAll))
  },[percentAll])

  const progressInPercent = useSelector(state=> {
    const {tasks} = state.diagnostic

    const sectionsData = TASKS_COUNT.map(section=>{
      const count = getCountOfCompleted(tasks[section.name], section.type)  //Количество сделанных заданий в конкретном разделе
      const percent = count / section.count * 100                   //Количество в процентах
      return {
          name: section.name,
          title: section.title,
          percent: percent.toFixed(0)
      }
      }
    )
    //Считаем общий процент решеных упражнений
    const countCompletedAll = sectionsData.reduce((sum, sec) => sum + Number(sec.percent), 0) / sectionsData.length


    if (percentAll !== countCompletedAll){
      setPercentAll(countCompletedAll)
    }

    return sectionsData
  })

  const handleMouseOver = () => {
    setVisible(true)
  }

  const handleMouseOut = () => {
    setVisible(false)
  }

  return(
    <div
      className="progress"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
     >
      {isVisible ?
      <div className="progress__info animate__animated animate__slideInUp">
        <ul className="progress__list">

          {progressInPercent.map(progress=>
              <li className="progress__item" key={progress.name}>
                <span className="progress__title">{progress.title}</span>
                <Line
                  percent={progress.percent}
                  trailWidth="4"
                  strokeWidth="4"
                  strokeColor="#cd5b45"
                  trailColor="#f7e3e5"
                  strokeLinecap="square"
                  className="progress__line_main"
                />
              </li>
          )}

        </ul>
      </div> : null }
      <span className="progress__title_main">Прогресс: </span>
      <Line
        percent={percentAll}
        trailWidth="4"
        strokeWidth="4"
        strokeColor="#cd5b45"
        trailColor="#fff"
        strokeLinecap="square"
        className="progress__line_main"
      />
    </div>
  )
}


