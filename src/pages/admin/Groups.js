import React, {useState, useEffect} from 'react'
import {getUsers, getStudents, getGroups, attachStudent, unAttachStudent} from "../../http/groupAPI";
import Table from "../../components/table/Table";
import _ from 'lodash'

export function Groups(props) {
  const [users, setUsers] = useState([])
  const [activeUserId, setActiveUserId] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [students, setStudents] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [groups, setGroups] = useState([])

  useEffect(()=>{
    getUsers().then(res=>{
      setUsers(res)
      const userId = res[0].id
      getGroups(userId).then(res=>setGroups(res))
      setActiveUserId(userId)
    })
    getStudents().then(students=>{
      setStudents(students)
      setActiveStudentId(students[0].id)
    })
  }, [])

  const handleChangeUser = (e) => {
    e.preventDefault()
    const userId = e.target.value
    getGroups(userId).then(res=>setGroups(res))
    setActiveUserId(userId)
  }

  const handleChangeStudent = (e) => {
    e.preventDefault()
    const studentId = e.target.value
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
        getGroups(activeUserId).then(res=>setGroups(res))
      })
      .catch(e=>console.log(e))
  }

  const handleUnAttach = (id) => {
    if(id){
      unAttachStudent(id).then(()=>{
        getGroups(activeUserId).then(res=>setGroups(res))
      })
        .catch(e=>console.log(e))
    }
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
              data={groups}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              handleRemove={handleUnAttach}
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
