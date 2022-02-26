import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Header} from "../../components/header/Header";
import {getGroups} from "../../http/groupAPI";
import Table from "../../components/table/Table";

export default function DiagnosticMenu() {
  const {id, fullName} = useSelector(state=>state.user)
  const [students, setStudents] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getGroups(id).then(group=>{
      setStudents(group)
      if (group.length > 0){
        setActiveStudentId(group[0].id)
      }
      setIsLoading(true)
    })
  },[])

  const handleChange = (e) => {
    setActiveStudentId(e.target.value)
  }

  return (
    <div className='diagnostic-menu'>
      <Header username={fullName}/>
      {isLoading ?
      <div className='diagnostic-menu__container'>
        <h1 className='diagnostic-menu__h1'>Выберите ученика</h1>
        <select
          name="students"
          className='diagnostic-menu__select'
          defaultValue={activeStudentId}
          onChange={handleChange}
        >
          {students.map(({id, lastName, firstName})=>
            <option key={id} value={id}>{lastName + ' ' + firstName}</option>)}
        </select>
        <h3 className='diagnostic-menu__h3'>
          Обследования
          <button className='diagnostic-menu__button_type_add'>+</button>
        </h3>
        <div className="diagnostic-menu__table">
          <Table
            type='student'
            data={[{id:2, date: '12/09/1991'}, {id:1, date: '12/09/1991'}]}
          />
        </div>
      </div> : null}
    </div>
  )
}