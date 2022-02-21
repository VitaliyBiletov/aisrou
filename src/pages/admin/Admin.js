import React, {useState, useEffect} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './style.sass'
import {Management} from "./Management";
import {getAll} from "../../http/managementAPI";
import {Groups} from "./Groups";


export default function Admin() {
  return (
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
            <Route path='users' element={<UserManagement/>}/>
            <Route path='pupils' element={<StudentManagement/>}/>
            <Route path='groups' element={<Groups />}/>
            <Route path='results' element={<Groups />}/>
            <Route path='*' element={<UserManagement/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

const UserManagement = generateManagement(Management, {type: 'user', title: 'Пользователи'})
const StudentManagement = generateManagement(Management, {type: 'student', title: 'Ученики'})

function generateManagement(Component, props) {
  return () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const update = async () => {
      const list = await getAll(props.type)
      setData(list)
    }

    useEffect(() => {
      setIsLoading(false)
      update().catch(e => console.log(e))
      setIsLoading(true)
    }, [])

    if (!isLoading) {
      return <p>Загрузка</p>
    }
    return <Component update={update} data={data} isLoading={isLoading} type={props.type} title={props.title}/>
  }
}

function Results() {
  return (
    <div>Результаты</div>
  )
}