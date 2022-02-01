import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Progress from '../../components/progress/Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import "animate.css/animate.css"
import { SECTIONS } from './sections/const'
// import * as Scroll from 'react-scroll';
// import { animateScroll as scroll } from 'react-scroll'
import './style.sass'


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
    // window.addEventListener('scroll', (e) => {
    //   if (window.scrollY > 150){
    //       this.setState({isVisibleUp: true})
    //   } else {
    //       this.setState({isVisibleUp: false})
    //   }
    // })
  }

  handleSelect = (index) => {
    this.setState({'activeTab': index})
    sessionStorage.setItem('activeTab', index)
  }

  render() {
    return (
      <div className="diag" id="diag">
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
                      onClick={()=>{scroll.scrollToTop()}}
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