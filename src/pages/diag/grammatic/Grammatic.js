import React from 'react'
import Subsection from '../../../components/subsection/Subsection'
import GRAMMATIC_DATA from "./grammaticData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="diagnostic-section">
        <h1>Грамматический строй и словообразование</h1>
        {GRAMMATIC_DATA.map(({id, name, title, text, instruction, data, type}, index) => {
          return (
            <Subsection
              key={id}
              name={name}
              section='grammatic'
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