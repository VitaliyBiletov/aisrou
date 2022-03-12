import React from 'react'
import {Task, generatedTask} from "../task/Task";
import StateFunc from "../stateFunc/StateFunc";

export default function Section(props){
  const {title, name, type, data} = props
  switch (type){
    case "info":
      return <div className={`section ${name}`}>
        <h1 className="section__header">{title}</h1>
        <StateFunc data={data}/>
      </div>
    default: {
      return(
        <div className={`section ${name}`}>
          <h1 className="section__header">{title}</h1>
          <div className="section__container">
            {data.map((items, index) => {
              return <div key={index}>
                {generatedTask(Task, {...items, nameSection: props.name})}
              </div>
            })
            }
          </div>
        </div>
      )
    }
  }

}