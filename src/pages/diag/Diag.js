import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StateFunc from "./sections/stateFunc/StateFunc";
import Sensmotor from "./sections/sensmotor/Sensmotor";
import Grammatic from "./sections/grammatic/Grammatic";
import Lexis from "./sections/lexis/Lexis";
import Progress from '../../components/progress/Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import "animate.css/animate.css"

// import * as Scroll from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll'

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
      activeTab: 0,
      isVisibleUp: false
    }
  }

  componentDidMount(){
    const activeTab = !sessionStorage.getItem('activeTab') ? 0 : Number(sessionStorage.getItem('activeTab'))
    this.setState({'activeTab': activeTab})
  }

  scrollToTop = function() {
      scroll.scrollToTop({
          duration: 800,
          containerId:"diag",
          smooth: 'easeInOutCubic'
      });
  }

  handleSelect = (index) => {
    this.setState({'activeTab': index})
    sessionStorage.setItem('activeTab', index)
  }

  handleScroll = (e) => {
    if (e.target.scrollTop > 50){
      this.setState({isVisibleUp: true})
    } else {
      this.setState({isVisibleUp: false})
    }
  }

  render() {
    return (
      <div className="diag" id="diag" onScroll={this.handleScroll}>
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
          {
            this.state.isVisibleUp ?
                  <button
                      className="diag__btn diag__btn_up animate__animated animate__fadeIn"
                      onClick={this.scrollToTop}
                  >
                    <FontAwesomeIcon icon={faAngleUp} size="4x"/>
                  </button>
              :
            null
          }
        <div className='diag__bottom-section'>
          <button className='diag__btn diag__btn_save'>Сохранить</button>
          <button className='diag__btn diag__btn_cancel'>Отмена</button>
          <Progress />
        </div>
      </div>
    )
  }
}