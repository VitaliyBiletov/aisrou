import React from 'react'
import {setSkill, resetSkills} from "../../redux/actions/tasksActions";
import {useDispatch, useSelector} from 'react-redux'
import {TabList, Tab, Tabs, TabPanel} from 'react-tabs'
import _ from 'lodash'
import PropTypes from 'prop-types'

export default function SkillsPanel(props) {
    return (
        <div className='skills-panel'>
            <Tabs className="skills-panel__tabs" selectedTabClassName="skills-panel__tab_active">
                <TabList className='skills-panel__tab-list'>
                    {props.options.map(({name, title}) =>
                        <Tab
                            className='skills-panel__tab'
                            key={name}
                            to={name}
                        >{title}</Tab>
                    )}
                </TabList>
                {props.options.map(({name, title, items}) =>
                    <TabPanel
                        className="skills-panel__tab-panel"
                        selectedClassName="skills-panel__tab-panel_selected"
                        key={name}>
                        <SkillList items={items} name={props.name} nameSec={name}/>
                    </TabPanel>)}
            </Tabs>
        </div>
    )
}

function SkillList(props) {
    const {items} = props
    const chunks = _.chunk(items, 5)
    const analysis = useSelector(({diagnostic}) => diagnostic.tasks[props.name])
    const dispatch = useDispatch()

    const handleChecked = (type, name, taskName) => (e) => {
        const names = ['noErrorsRight', 'intonedReading', 'understanding', 'noErrors']
        if (names.includes(name) || taskName === "readingMethod") {
            dispatch(resetSkills(type, name, taskName, e.target.checked))
        } else {
            dispatch(setSkill(type, name, taskName, e.target.checked))
        }
    }

    return (<div className='skills-list'>
            {chunks.map((chunk, index) => {
                return <div key={index} className="skills-list__column">
                    {chunk.map(({name, title, type}) => {
                        const checked = analysis.skills[props.nameSec][name]
                        return <div key={name} className={`skills-list__checkbox ${type ? type : ''}`}>
                            <input type="checkbox"
                                   checked={checked}
                                   onChange={handleChecked(props.name, name, props.nameSec)}
                                   id={name}
                                   name={name}/>
                            <label htmlFor={name}>{title}</label>
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

SkillsPanel.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array
}

SkillList.propTypes = {
    items: PropTypes.array,
    name: PropTypes.string,
    nameSec: PropTypes.string
}
