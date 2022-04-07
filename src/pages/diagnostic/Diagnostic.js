import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Progress from '../../components/progress/Progress'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'
import DIAG_DATA from './diagnosticData'
import Section from '../../components/section/Section'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {animateScroll as scroll} from 'react-scroll'
import {check} from '../../http/userAPI'
import {DIAGNOSTIC_MENU_ROUTE, LOGIN_ROUTE} from "../../utils/const";
import {Header} from "../../components/header/Header";
import {useSelector, useDispatch} from "react-redux";
import {saveDiagnostic} from "../../http/diagnosticAPI";
import _ from 'lodash'
import {setInfoData, setStudent} from "../../redux/actions/infoActions";

export default function Diagnostic(props) {
  const [activeTab, setActiveTab] = useState(0)
  const [isVisibleUp, setVisibleUp] = useState(false)
  const data = useSelector(state => state.diagnostic)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {

    if (!sessionStorage.getItem('student')) {
      return navigate(DIAGNOSTIC_MENU_ROUTE)
    } else {
      const student = JSON.parse(sessionStorage.getItem('student'))
      dispatch(setStudent(student))
    }

    const diagInfo = JSON.parse(sessionStorage.getItem("diagInfo"))

    if (!diagInfo) {
      return navigate(DIAGNOSTIC_MENU_ROUTE)
    } else {
      dispatch(setInfoData(diagInfo))
    }

    const activeTab = !sessionStorage.getItem('activeTab') ? 0 : Number(sessionStorage.getItem('activeTab'))
    setActiveTab(activeTab)
    try {
      check()
    } catch (e) {
      navigate(LOGIN_ROUTE)
    }
    window.addEventListener('scroll', fadeInUpper)
    return ()=>{
      window.removeEventListener("scroll", fadeInUpper)
    }
  }, [])

  const fadeInUpper = () => {
    if (window.scrollY > 150) {
      setVisibleUp(true)
    } else {
      setVisibleUp(false)
    }
  }

  const handleSelect = (index) => {
    setActiveTab(index)
    sessionStorage.setItem('activeTab', index)
  }

  const handleClick = (e) => {
    saveDiagnostic({id: data.info.data.id, data: data.tasks.stateOfFunc})
  }

  const handleExit = () => {
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }

  return (
    <div className="diagnostic" id="diagnostic">
      <Header/>
      <Tabs className='diagnostic__tabs' selectedIndex={activeTab} onSelect={handleSelect}>
        <TabList className='diagnostic__tab-list'>
          {DIAG_DATA.map((s) =>{
            if (data.info.data.classNumber === 0 && (s.name === "writing" || s.name === "reading")){
              return null
            }
            return <Tab key={s.name} className='diagnostic__item'>{s.title}</Tab>
          })}
        </TabList>

        {DIAG_DATA.map((s) => {
          if (data.info.data.classNumber === 0 && (s.name === "writing" || s.name === "reading")){
            return null
          }
          return (
            <TabPanel key={s.name} className='diagnostic__tab-panel'>
              <Section
                name={s.name}
                title={s.title}
                data={s.data}
                type={s.type}
                hints={s.hints}
              />
            </TabPanel>
          )
        }
        )}
      </Tabs>
      {
        isVisibleUp ?
          <button
            className="diagnostic__btn diagnostic__btn_up animate__animated animate__fadeIn"
            onClick={() => {
              scroll.scrollToTop()
            }}
          >
            <FontAwesomeIcon icon={faAngleUp} size="4x"/>
          </button>
          : null
      }
      <div className='diagnostic__bottom-section'>
        <button className='diagnostic__btn diagnostic__btn_save' onClick={handleClick}>Сохранить</button>
        <button
          className='diagnostic__btn diagnostic__btn_cancel'
          onClick={() => {
            sessionStorage.removeItem('activeTab')
            navigate(DIAGNOSTIC_MENU_ROUTE)
          }}
        >Отмена</button>
        <Progress/>
      </div>
    </div>
  )
}