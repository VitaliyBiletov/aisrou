import React from 'react'
import Subsection from '../../../components/subsection/Subsection'
import SENSMOTOR_DATA from "./SensmotorData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="section">
        <h1 className="section__header">Сенсо-моторный уровень</h1>
        <div className="section__container">
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
      </div>
    )
  }
}
