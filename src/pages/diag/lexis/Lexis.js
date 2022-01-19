import React from 'react'
import Subsection from '../../../components/subsection/Subsection'
import LEXIS_DATA from "./lexisData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="diagnostic-section">
        <h1>Лексический строй</h1>
        {LEXIS_DATA.map(({id, name, title, text, instruction, data, type}, index) => {
          return (
            <Subsection
              key={id}
              name={name}
              section='lexis'
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