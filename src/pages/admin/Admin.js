import React from 'react'
import {useNavigate, Routes, Route, Link} from 'react-router-dom'
import {DIAGNOSTIC_ROUTE} from "../../utils/const"
import {Tabs, Tab, TabPanel, TabList} from 'react-tabs'
import './style.sass'


export default function Admin(){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(DIAGNOSTIC_ROUTE)
    }

    return(
      <div className='admin'>
        <header className='admin__header'>
          <div className='admin__logo'><span className='admin__logo_span'>АИСРОУ</span></div>
          <div className='admin__header-menu'>
            <button className='admin__button'>Выход</button>
          </div>
        </header>
        <div className='admin__container'>
          <div className='admin__menu'>
            <Link className='admin__link' to='users'>Пользователи</Link>
            <Link className='admin__link' to='pupils'>Ученики</Link>
            <Link className='admin__link' to='groups'>Группы</Link>
            <Link className='admin__link' to='results'>Результаты</Link>
          </div>
          <div className='admin__content'>
            <Routes>
              <Route index element={<Users/>}/>
              <Route index path='users' element={<Users/>}/>
              <Route path='pupils' element={<Pupils/>}/>
              <Route path='groups' element={<Groups/>}/>
              <Route path='results' element={<Results/>}/>
            </Routes>
          </div>
        </div>
      </div>
    )
}

function Users() {
  return(
    <div>Пользователи2</div>
  )
}

function Pupils() {
  return(
    <div>Ученики</div>
  )
}

function Groups() {
  return(
    <div>Группы</div>
  )
}

function Results() {
  return(
    <div>Результаты</div>
  )
}