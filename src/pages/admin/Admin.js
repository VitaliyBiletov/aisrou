import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './style.sass'
import {Management} from "./Management";



export default function Admin(){
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
              <Route path='users' element={<Management type='user' title='Пользователи'/>}/>
              <Route path='pupils' element={<Management type='student' title='Ученики'/>}/>
              <Route path='groups' element={<Groups/>}/>
              <Route path='results' element={<Results/>}/>
              <Route path='*' element={<Management type='user' title='Пользователи'/>}/>
            </Routes>
          </div>
        </div>
      </div>
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