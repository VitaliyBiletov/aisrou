import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StateFunc from "./stateFunc/StateFunc";
import Sensmotor from "./sensmotor/Sensmotor";
import Grammatic from "./grammatic/Grammatic";
import Lexis from "./lexis/Lexis";
import './style.sass'

const SECTIONS = [
  {tabName: 'Состояние функций', component: <StateFunc />},
  {tabName: 'Сенсо-моторный уровень', component: <Sensmotor />},
  {tabName: 'Грамматика', component: <Grammatic />},
  {tabName: 'Лексика', component: <Lexis />},
]

export default class Diag extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="diag">
        <Tabs className='diag__tabs' defaultIndex={1}>
          <TabList className='diag__tab-list'>
            { SECTIONS.map((s, index)=><Tab key={index} className='diag__item'>{s.tabName}</Tab>)}
          </TabList>

          {SECTIONS.map((s, index)=>(
            <TabPanel key={index} className='diag__tab-panel'>
              {s.component}
            </TabPanel>
          ))}
        </Tabs>
        <div className='diag__bottom-section'>
          <button className='diag__btn diag__btn_save'>Сохранить</button>
          <button className='diag__btn diag__btn_cancel'>Отмена</button>
          <div className="diag__progress">
            <span>Прогресс:</span>
            <progress className="diag__progress-bar" max="100" value="50" >

            </progress>
          </div>

        </div>
      </div>
    )
  }
}