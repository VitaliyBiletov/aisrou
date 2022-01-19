import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StateFunc from "./stateFunc/StateFunc";
import Sensmotor from "./sensmotor/Sensmotor";
import Grammatic from "./grammatic/Grammatic";
import Lexis from "./lexis/Lexis";
import './style.sass'


export default class Diag extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="diag">
        <Tabs className='diag__tabs' defaultIndex={1}>
          <TabList className='diag__tab-list'>
            <Tab className='diag__item'>Состояние функций</Tab>
            <Tab className='diag__item'>Сенсо-моторный уровень</Tab>
            <Tab className='diag__item'>Грамматика</Tab>
            <Tab className='diag__item'>Лексика</Tab>
          </TabList>

          <TabPanel className='diag__tab-panel'>
            <StateFunc/>
          </TabPanel>
          <TabPanel className='diag__tab-panel'>
            <Sensmotor/>
          </TabPanel>
          <TabPanel className='diag__tab-panel'>
            <Grammatic/>
          </TabPanel>
          <TabPanel className='diag__tab-panel'>
            <Lexis/>
          </TabPanel>
        </Tabs>
        <div className='diag__bottom-section'>
          <button className='diag__btn diag__btn_save'>Сохранить</button>
          <button className='diag__btn diag__btn_cancel'>Отмена</button>
        </div>
      </div>
    )
  }
}