import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Routes, Route, NavLink} from 'react-router-dom'
import {Management} from "./Management";
import {getAll} from "../../http/managementAPI";
import {Groups} from "./Groups";
import { TailSpin } from  'react-loader-spinner'
import {Header} from "../../components/header/Header";


export default function Admin() {
  const {fullName} = useSelector(state=>state.user)

  return (
    <div className='admin'>
      <Header username={fullName}/>
      <div className='admin__container'>
        <div className='admin__menu'>
          <NavLink className={`admin__link`} to='users'>Пользователи</NavLink>
          <NavLink className={`admin__link`} to='pupils'>Ученики</NavLink>
          <NavLink className={`admin__link`} to='groups'>Группы</NavLink>
          <NavLink className={`admin__link`} to='results'>Результаты</NavLink>
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
    const [fields, setFields] = useState([])
    console.log('management data', data)
    // const update = async () => {
    //   const list = await getAll(props.type)
    //   setData(list)
    // }

    useEffect(() => {
      setIsLoading(false)
      getAll(props.type).then(({fields, data})=>{
        setData(data)
        setFields(fields)
      })
      setIsLoading(true)
    }, [])

    if (!isLoading) {
      return (
        <TailSpin
          height="50"
          width="50"
          color='#4e4583'
        />
      )
    }
    return <Component
      data={data}
      fields={fields}
      setData={setData}
      isLoading={isLoading}
      type={props.type}
      title={props.title}
    />
  }
}

function Results() {
  return (
    <div>Результаты</div>
  )
}