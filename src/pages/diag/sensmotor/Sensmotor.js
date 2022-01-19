import React from 'react'
import Subsection from '../../../components/subsection/Subsection'
import SENSMOTOR_DATA from "./SensmotorData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="diagnostic-section senso-motor-level">
        <h1>Сенсо-моторный уровень</h1>
        <progress max="100" value="75">
          Загружено на <span id="value">25</span>%
        </progress>
        {SENSMOTOR_DATA.map(({id, name, title, text, instruction, data, type}, index) => {
          return (
            <Subsection
              key={id}
              name={name}
              section='sensMotor'
              title={title}
              instruction={instruction}
              type={type}
              text={text}
              data={data}
            />
          )
        })}
      </div>
    )
  }
}
