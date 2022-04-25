import React, {useState, useEffect} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Progress from '../../components/progress/Progress'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleUp} from '@fortawesome/free-solid-svg-icons'
import DIAG_DATA from './diagnosticData'
import Section from '../../components/section/Section'
import {useNavigate} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'
import {check} from '../../http/userAPI'
import {DIAGNOSTIC_MENU_ROUTE, LOGIN_ROUTE} from "../../utils/const";
import {Header} from "../../components/header/Header";
import {useSelector, useDispatch} from "react-redux";
import {saveDiagnostic, tasksLoading} from "../../http/diagnosticAPI";
import {setInfoData, setStudent} from "../../redux/actions/infoActions";
import {stateLoading, resetState} from "../../redux/actions/tasksActions";
import Result from "../result/Result";

export default function Diagnostic(props) {
  const [activeTab, setActiveTab] = useState(0)
  const [isVisibleUp, setVisibleUp] = useState(false)
  const [fixed, setFixed] = useState(false)
  const [heightMenu, setHeightMenu] = useState(0)
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
      tasksLoading(diagInfo.id).then(data =>
        dispatch(stateLoading({data})))
    }

    const activeTab = !sessionStorage.getItem('activeTab') ? 0 : Number(sessionStorage.getItem('activeTab'))
    setActiveTab(activeTab)
    try {
      check()
    } catch (e) {
      navigate(LOGIN_ROUTE)
    }
    window.addEventListener('scroll', fadeInUpper)
    return () => {
      window.removeEventListener("scroll", fadeInUpper)
    }
  }, [])

  const fadeInUpper = () => {
    if (window.scrollY > 30) {
      const menu = document.getElementsByClassName("diagnostic__tab-list")
      setHeightMenu(menu[0].offsetHeight)
      setFixed(true)
      // setVisibleUp(true)
    } else {
      setFixed(false)
      // setVisibleUp(false)
    }
  }

  const handleSelect = (index) => {
    setActiveTab(index)
    sessionStorage.setItem('activeTab', index)
  }

  const handleClick = (e) => {
    const {progress} = data.info.data
    saveDiagnostic({id: data.info.data.id, progress, results: data.tasks})
  }

  const handleExit = () => {
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }

  return (
    <div className="diagnostic" id="diagnostic">
      <Header/>
      <Tabs className={`diagnostic__tabs`} selectedIndex={activeTab} onSelect={handleSelect}>
        <TabList className={`diagnostic__tab-list ${fixed ? 'fixed' : ''}`}>
          {DIAG_DATA.map((s) => {
            if (data.info.data.classNumber === 0 && (s.name === "writing" || s.name === "reading")) {
              return null
            }
            return <Tab key={s.name} className='diagnostic__item'>{s.title}</Tab>
          })}
          <Tab className='diagnostic__item diagnostic__result'>Результаты</Tab>
        </TabList>

        {DIAG_DATA.map((s) => {
            if (data.info.data.classNumber === 0 && (s.name === "writing" || s.name === "reading")) {
              return null
            }
            return (
              <TabPanel style={fixed ? {marginTop: `${heightMenu + 20}px`} : {marginTop: "10px"}}
                        key={s.name}
                        className={`diagnostic__tab-panel`}>
                <Section
                  name={s.name}
                  title={s.title}
                  data={s.data}
                  type={s.type}
                  hints={s.hints}
                  options={s.options}
                />
              </TabPanel>
            )
          }
        )}
        <TabPanel>
          <Result />
        </TabPanel>
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
            dispatch(resetState())
            navigate(DIAGNOSTIC_MENU_ROUTE)
          }}
        >Отмена
        </button>
        <Progress/>
      </div>
    </div>
  )
}