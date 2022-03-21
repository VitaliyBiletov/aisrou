import React, {useState, useEffect} from 'react'
import {getGroups, attachStudent} from "../../http/groupAPI";
import {getListUsers} from '../../http/userAPI'
import {getListStudents} from '../../http/studentAPI'
import Table from "../../components/table/Table";
import Select from 'react-select'
import _ from 'lodash'


const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    color: '#4e4583',
  }),

  option: (provided, state) => ({
    padding: 5,
    '&:hover': {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: '#6a5fab'
    }
  }),

  singleValue: (provided, state) => {
    const color = '#4e4583';
    return { ...provided, color};
  }
}

export function Groups(props) {
  const [users, setUsers] = useState([])
  const [activeUserId, setActiveUserId] = useState(null)
  const [students, setStudents] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [groups, setGroups] = useState(null)
  const [data, setData] = useState([])
  const [fields, setFields] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getListUsers().then(res=>{
      setUsers(res)
      // const userId = res[0].id
      // getGroups(userId).then(res=>{
      //   setData(res.data)
      //   setFields(res.fields)
      // })
      // setActiveUserId(userId)
    })
    getListStudents().then(students=>{
      setStudents(students)
      // setActiveStudentId(students[0].id)
    })
    setIsLoading(true)
  }, [])

  console.log(data)
  console.log(fields)

  const handleChangeUser = (e) => {
    const userId = e.value
    getGroups(userId).then(res=>{
      console.log(res)
      setData(res.data)
      setFields(res.fields)
    })
    setActiveUserId(userId)
  }

  const handleChangeStudent = (e) => {
    const studentId = e.value
    setActiveStudentId(studentId)
  }

  const handleAttach = (e) => {
    e.preventDefault()
    const student = _.find(groups, (group)=>group.studentId === Number(activeStudentId))
    if (student){
      console.log('Ученик уже прикреплен')
      return
    }
    attachStudent(activeUserId, activeStudentId)
      .then(()=>{
        getGroups(activeUserId).then(res=>{
          setData(res.data)
          setFields(res.fields)
        })
      })
      .catch(e=>console.log(e))
  }

  return (
    <div className='groups'>
      <h2 className='groups__title title'>Группы</h2>
      {isLoading ?
        <>
        <form className='groups__form'>
          <div className='groups__form-item'>
            <label htmlFor="users" className='groups__label'>Учитель</label>
            <Select
              placeholder="Выберите"
              styles={customStyles}
              onChange={handleChangeUser}
              options={users.map(u=>
                ({value: u.id, label: u.name})
              )}/>
          </div>
          <div className='groups__form-item'>
            <label className='groups__label'>
              Ученик
              <Select
                placeholder="Выберите"
                styles={customStyles}
                onChange={handleChangeStudent}
                options={students.map(s=>
                  ({value: s.id, label: s.name})
                )}/>
            </label>
          </div>
        </form>
      <button
        onClick={handleAttach}
        className='groups__button'
      >Прикрепить</button>
        <div className='attached-students'>
          <h3 className='attached-students__h4'>Закреплённые ученики</h3>
          <div className='attached-students__table'>
            {data.length !== 0 ?
            <Table
              data={data}
              fields={fields}
              setData={setData}
              type="group"
              functions={{isRemove: true}}
            /> : <p>Нет закрепленных учеников</p>}
          </div>
        </div> </>: null }
    </div>
  )
}

function userNameFormatting(user) {
  const {firstName, lastName, patronymic} = user
  return `${lastName} ${firstName[0]}. ${patronymic[0]}.`
}
