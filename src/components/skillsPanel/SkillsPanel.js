import {setSkill} from "../../redux/actions/tasksActions";
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TabList, Tab, Tabs, TabPanel} from 'react-tabs'
import _ from 'lodash'

export default function SkillsPanel(props) {

  useEffect(() => {

  }, [])

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
            <SkillList data={items} name={props.name} type={props.type}/>
          </TabPanel>)}
      </Tabs>
    </div>
  )
}

function SkillList(props) {

  const {data} = props
  const chunk = _.chunk(data, 5)
  const analysis = useSelector(({diagnostic}) => diagnostic.tasks[props.name])
  const dispatch = useDispatch()

  const handleChecked = (type, name) => (e) => {
    dispatch(setSkill(type, name, e.target.checked))
  }

  return (
    <div className='skills-list'>
      {chunk.map((c, index) => {
        return <div key={index} className='skills-list__column'>
          {c.map(({name, title}) => {
            const skill = analysis.skills.find((skill) => skill.name === name)
            return <div key={name} className='skills-list__checkbox'>
              <input type="checkbox" defaultChecked={skill ? skill.value : false} onClick={handleChecked(props.name, name)}
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
