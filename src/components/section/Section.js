import React from 'react'
import {Task, generatedTask} from "../task/Task";
import StateFunc from "../stateFunc/StateFunc";
import SkillsPanel from "../skillsPanel/SkillsPanel";

export default function Section(props) {
  const {name, type, data} = props
  switch (type) {
    case "info":
      return <div className={`section ${name} `}>
        <div className="section__container animate__animated animate__fadeIn">
          <StateFunc data={data}/>
        </div>
      </div>
    default: {
      return (
        <div className={`section ${name} animate__animated animate__fadeIn`}>
          <div className="section__container animate__animated animate__fadeIn">
            {data.map((items, index) => {
              return <div className="task__container" key={index}>
                {generatedTask(Task, {...items, nameSection: props.name, options: props.options})}
              </div>
            })
            }
            {props.type === "analysis" ? <SkillsPanel type={props.type} name={props.name} options={props.options}/>
              : null}
          </div>
        </div>
      )
    }
  }

}

