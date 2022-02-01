import React from 'react'
import Subsection from '../../../../components/subsection/Subsection'
import GRAMMATIC_DATA from "./grammaticData"

export default class Sensmotor extends React.Component {
  render() {
    return (
      <div className="section">
        <h1 className="section__header">Грамматический строй и словообразование</h1>
        <div className="section__container">
        {GRAMMATIC_DATA.map(({id, name, title, text, instruction, data, type, hints}, index) => {
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
              hints={hints}
            />
          )
        })}
        </div>
      </div>
    )
  }
}