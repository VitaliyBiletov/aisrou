import React from 'react'


export default function Explanation(props){
  console.log('hints ',props.hints)
  return(
    <div className="explanation">
      <p className="explanation__header">Параметры оценивания:</p>
      <div className="explanation__container">
        <div className="explanation__column">
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_red" />
            <p className="explanation__text">{props.hints[0].text}</p>
          </div>
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_yellow" />
            <p className="explanation__text">{props.hints[1].text}</p>
          </div>
        </div>
        <div className="explanation__column">
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_blue" />
            <p className="explanation__text">{props.hints[2].text}</p>
          </div>
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_green" />
            <p className="explanation__text">{props.hints[3].text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}