import React from 'react'
import Subsection from '../subsection/Subsection'
import SENSMOTOR_DATA from "./SensmotorData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="diagnostic-section senso-motor-level">
        <h1>Сенсо-моторный уровень</h1>
        {SENSMOTOR_DATA.map(({id, name, title, instruction, data}, index) => {
          return (
            <Subsection
              key={id}
              name={name}
              title={title}
              instruction={instruction}
              data={data}
            />
          )
        })}
      </div>
    )
  }
}
