import React from 'react'
import Subsection from "../subsection/Subsection";
import StateFunc from "../stateFunc/StateFunc";
import Analysis from "../analysis/Analysis";


export default function Section(props){
  const {title, data, type} = props
  return(
    <div className={`section ${name}`}>
      <h1 className="section__header">{title}</h1>
      <div className="section__container">
        { type==="info" ?
          <StateFunc
            name={name}
            data={data}
            title={title}
          /> : null
        }
        { type==="tasks" ?
        data.map(({id, name, title, text, instruction, data, type, hints}) => {
          return (
            <Subsection
              key={id}
              name={name}
              section={props.name}
              title={title}
              instruction={instruction}
              type={type}
              text={text}
              data={data}
              hints={hints}
            />
          )
        }) : null }
        { type==="analysis" ?
          data.map(({id, type, title, description})=>
            <Analysis
              key={id}
              description={description}
              title={title}
              type={type}
              id={id}
            />)
          : null
        }
      </div>
    </div>
  )
}