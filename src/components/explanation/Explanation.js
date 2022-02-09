import React from 'react'
import "./style.sass"

export default function Explanation(){
  return(
    <div className="explanation animate__animated animate__slideInDown">
      <p className="explanation__header">Параметры оценивания:</p>
      <div className="explanation__container">
        <div className="explanation__column">
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_red" />
            <p className="explanation__text">{this.props.hints[0].text}</p>
          </div>
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_yellow" />
            <p className="explanation__text">{this.props.hints[1].text}</p>
          </div>
        </div>
        <div className="explanation__column">
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_blue" />
            <p className="explanation__text">{this.props.hints[2].text}</p>
          </div>
          <div className="explanation__cell">
            <div className="explanation__color explanation__color_green" />
            <p className="explanation__text">{this.props.hints[3].text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}