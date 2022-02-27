import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Header} from "../../components/header/Header";
import {getGroups} from "../../http/groupAPI";
import {getDiagnostics, createDiagnostic, removeDiagnostic} from "../../http/diagnosticAPI";
import Table from "../../components/table/Table";


export default function DiagnosticMenu() {
  const {id, fullName} = useSelector(state=>state.user)
  const [students, setStudents] = useState([])
  const [diagnostics, setDiagnostics] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getGroups(id).then(group=>{
      setStudents(group)
      if (group.length > 0){
        setActiveStudentId(group[0].studentId)
        getDiagnostics(group[0].studentId).then(diags=>{
          setDiagnostics(diags)
        })
      }
      setIsLoading(true)
    })
  },[])

  const handleChange = (e) => {
    setActiveStudentId(e.target.value)
    getDiagnostics(e.target.value).then(diags=>{
      setDiagnostics(diags)
    })
  }

  const handleCreate = (e) => {
    createDiagnostic(activeStudentId).then(({data})=>{
      setDiagnostics([...diagnostics, data])
      console.log(data)
    })
  }

  const handleRemove = (active) => {
    removeDiagnostic(active).then(()=>{
      const diagFiltered = diagnostics.filter(d=>d.id !== active)
      setDiagnostics(diagFiltered)
    })
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
          {students.map(({studentId, lastName, firstName})=>
            <option key={studentId} value={studentId}>{lastName + ' ' + firstName}</option>)}
        </select>
        <h3 className='diagnostic-menu__h3'>
          Обследования
          <button
            className='diagnostic-menu__button_type_add'
            onClick={handleCreate}
          >+</button>
        </h3>
        <div className="diagnostic-menu__table">
          <Table
            type='student'
            data={diagnostics}
            handleRemove={handleRemove}
          />
        </div>
      </div> : null}
    </div>
  )
}