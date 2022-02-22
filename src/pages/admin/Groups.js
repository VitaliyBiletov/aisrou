import React, {useState, useEffect} from 'react'
import {getUsers, getStudents, getStudentsForUser, attachStudent} from "../../http/groupAPI";
import Table from "../../components/table/Table";
import './groups.sass'
import _ from 'lodash'

export function Groups(props) {
  const [users, setUsers] = useState([])
  const [activeUserId, setActiveUserId] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [students, setStudents] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [studentsForUser, setStudentsForUser] = useState([])

  useEffect(()=>{
    getUsers().then(res=>{
      setUsers(res)
      const userId = res[0].id
      getStudentsForUser(userId).then(res=>setStudentsForUser(res))
      setActiveUserId(userId)
    })
    getStudents().then(students=>{
      setStudents(students)
      setActiveStudentId(students[0].id)
    })

  }, [])
  console.log(studentsForUser)
  const handleChangeUser = (e) => {
    e.preventDefault()
    const userId = e.target.value
    getStudentsForUser(userId).then(res=>setStudentsForUser(res))
    setActiveUserId(userId)
  }

  const handleChangeStudent = (e) => {
    e.preventDefault()
    const studentId = e.target.value
    setActiveStudentId(studentId)
  }

  const handleAttach = (e) => {
    e.preventDefault()
    const student = _.find(studentsForUser, (student)=>student.id === activeStudentId)
    if (student){
      console.log('Ученик уже прикреплен')
      return
    }
    attachStudent(activeUserId, activeStudentId)
      .then(res=>{
        getStudentsForUser(activeUserId).then(res=>setStudentsForUser(res))
      })
      .catch(e=>console.log(e))
  }

  const handleRemove = (e) => {
    e.preventDefault()

  }

  return (
    <div className='groups'>
      <h2 className='groups__title title'>Группы</h2>
      <form className='groups__form'>
        <div className='groups__form-item'>
          <label htmlFor="users" className='groups__label'>Учитель</label>
          <select
            name="users"
            id="users"
            onChange={handleChangeUser}
            className='groups__select'
          >
            {users.map(user=><option key={user.id} value={user.id}>{userNameFormatting(user)}</option> )}
          </select>
        </div>
        <div className='groups__form-item'>
          <label htmlFor="students" className='groups__label'>Ученик</label>
          <select
            name="students"
            id="students"
            onChange={handleChangeStudent}
            className='groups__select'
          >
            {students.map(student=><option key={student.id} value={student.id}>{student.lastName}</option> )}
          </select>
        </div>
      </form>
      <button
        onClick={handleAttach}
        className='groups__button'
      >Прикрепить</button>
      {students.length !== 0 ?
        <div className='attached-students'>
          <h3 className='attached-students__h4'>Закреплённые ученики</h3>
          <div className='attached-students__table'>
            <Table
              data={studentsForUser}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              // handleRemove={}
            />
          </div>
        </div>: null
      }
    </div>
  )
}

function userNameFormatting(user) {
  const {firstName, lastName, patronymic} = user
  return `${lastName} ${firstName[0]}. ${patronymic[0]}.`
}
