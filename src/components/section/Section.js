import React from 'react'
import {Task, generatedTask} from "../task/Task";
import StateFunc from "../stateFunc/StateFunc";


export default function Section(props){
  const {title, name, type, data} = props
  switch (type){
    case "info":
      return <div className={`section ${name} `}>
        <h1 className="section__header animate__animated animate__fadeInDown">{title}</h1>
        <div className="section__container animate__animated animate__fadeIn">
          <StateFunc data={data}/>
        </div>
      </div>
    default: {
      return(
        <div className={`section ${name} animate__animated animate__fadeIn`}>
          <h1 className="section__header animate__animated animate__fadeInDown">{title}</h1>
          <div className="section__container animate__animated animate__fadeIn">
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