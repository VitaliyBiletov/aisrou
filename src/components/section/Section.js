import React from 'react'
import {Task, generatedTask} from "../task/Task";
import StateFunc from "../stateFunc/StateFunc";
import SkillsPanel from "../skillsPanel/SkillsPanel";
import PropTypes from 'prop-types'

export default function Section(props) {
    const {name, type, data} = props
    switch (type) {
        case "info":
            return <div className={`section ${name} `}>
                <div className="section__container animate__animated animate__fadeIn">
                    <StateFunc data={data}/>
                </div>
            </div>
        case "analysis":
            return (
                <div className={`section ${name} animate__animated animate__fadeIn`}>
                    <div className="section__container animate__animated animate__fadeIn">
                        {data.map((items, index) => {
                            return <div className="task__container" key={index}>
                                {generatedTask(Task, {...items, nameSection: props.name})}
                            </div>
                        })}
                        <SkillsPanel name={props.name} options={props.options}/>
                    </div>
                </div>
            )
        default: {
            return (
                <div className={`section ${name} animate__animated animate__fadeIn`}>
                    <div className="section__container animate__animated animate__fadeIn">
                        {data.map((items, index) => {
                            return <div className="task__container" key={index}>
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

Section.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    options: PropTypes.array
}
