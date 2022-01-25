import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StateFunc from "./sections/stateFunc/StateFunc";
import Sensmotor from "./sections/sensmotor/Sensmotor";
import Grammatic from "./sections/grammatic/Grammatic";
import Lexis from "./sections/lexis/Lexis";
import Progress from '../../components/progress/Progress'
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
    this.state = {
      activeTab: 0
    }
  }

  componentDidMount(){
    const activeTab = !sessionStorage.getItem('activeTab') ? 0 : Number(sessionStorage.getItem('activeTab'))
    this.setState({'activeTab': activeTab})

  }

  handleSelect = (index) => {
    this.setState({'activeTab': index})
    sessionStorage.setItem('activeTab', index)
  }

  render() {
    return (
      <div className="diag">
        <Tabs className='diag__tabs' selectedIndex={this.state.activeTab} onSelect={this.handleSelect}>
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
          <Progress />
        </div>
      </div>
    )
  }
}