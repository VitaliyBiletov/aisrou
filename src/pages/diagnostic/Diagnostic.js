import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Progress from '../../components/progress/Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import DIAG_DATA from './diagnosticData'
import Section from '../../components/section/Section'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { animateScroll as scroll } from 'react-scroll'
import {check} from '../../http/userAPI'
import {DIAGNOSTIC_MENU_ROUTE, LOGIN_ROUTE} from "../../utils/const";
import {Header} from "../../components/header/Header";
import {useSelector} from "react-redux";


export default function Diagnostic(){
  const [activeTab, setActiveTab] = useState(0)
  const [isVisibleUp, setVisibleUp] = useState(false)
  const {fullName} = useSelector(state=>state.user)
  const navigate = useNavigate()

  useEffect(async ()=>{
    const activeTab = !sessionStorage.getItem('activeTab') ? 0 : Number(sessionStorage.getItem('activeTab'))
    setActiveTab(activeTab)
    console.log("token", localStorage.getItem('token'))
    try {
      const res = await check()
      console.log(res)
    } catch (e) {
      console.log(e)
      navigate(LOGIN_ROUTE)
    }
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 150){
          setVisibleUp(true)
      } else {
        setVisibleUp(false)
      }
    })
  }, [])

  const handleSelect = (index) => {
    setActiveTab(index)
    sessionStorage.setItem('activeTab', index)
  }

  const handleExit = () =>{
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }

  return (
    <div className="diagnostic" id="diagnostic">
      <Header username={fullName}/>
      <Tabs className='diagnostic__tabs' selectedIndex={activeTab} onSelect={handleSelect}>
        <TabList className='diagnostic__tab-list'>
          { DIAG_DATA.map((s)=><Tab key={s.name} className='diagnostic__item'>{s.title}</Tab>)}
        </TabList>

        {DIAG_DATA.map((s)=>(
          <TabPanel key={s.name} className='diagnostic__tab-panel'>
            <Section
                name={s.name}
                title={s.title}
                data={s.data}
                type={s.type}
            />
          </TabPanel>
        ))}
      </Tabs>
        {
          isVisibleUp ?
                <button
                    className="diagnostic__btn diagnostic__btn_up animate__animated animate__fadeIn"
                    onClick={()=>{scroll.scrollToTop()}}
                >
                  <FontAwesomeIcon icon={faAngleUp} size="4x"/>
                </button>
            : null
        }
      <div className='diagnostic__bottom-section'>
        <button className='diagnostic__btn diagnostic__btn_save'>Сохранить</button>
        <button
          className='diagnostic__btn diagnostic__btn_cancel'
          onClick={()=>navigate(DIAGNOSTIC_MENU_ROUTE)}
        >Отмена</button>
        <Progress />
      </div>
    </div>
  )
}