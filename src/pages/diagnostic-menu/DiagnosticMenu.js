import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Header} from "../../components/header/Header";
import {getGroups} from "../../http/groupAPI";
import {getDiagnostics, createDiagnostic, removeDiagnostic} from "../../http/diagnosticAPI";
import Table from "../../components/table/Table";
import { Line } from 'rc-progress';
import Select from 'react-select'

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

export default function DiagnosticMenu() {
  const {id, fullName} = useSelector(state=>state.user)
  const [students, setStudents] = useState([])
  const [diagnostics, setDiagnostics] = useState([])
  const [activeStudentId, setActiveStudentId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    getGroups(id).then(group=>{
      setStudents(group)
      setIsLoading(true)
    })
  },[])

  const handleChange = (e) => {
    console.log(e.value)
      setActiveStudentId(e.value)
      getDiagnostics(e.value).then(diags=>{
      const diagsList = diags.map((d)=>{
        d.progress = <Line
          percent={50}
          trailWidth="20"
          strokeWidth="20"
          strokeColor="#009d23"
          trailColor="#e0ffe1"
          strokeLinecap="square"
          className="progress__line_main"
        />
        return d
      })
      setDiagnostics(diagsList)
      })

  }

  const handleCreate = (e) => {
    createDiagnostic(id, activeStudentId).then(({data})=>{
        data.progress = <Line
          percent={data.progress}
          trailWidth="20"
          strokeWidth="20"
          strokeColor="#009d23"
          trailColor="#e0ffe1"
          strokeLinecap="square"
          className="progress__line_main"
        />
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
        <div className='diagnostic-menu__select'>
          <Select
            placeholder="Выберите ученика"
            styles={customStyles}
            onChange={handleChange}
            options={students.map(s=>
              ({value: s.studentId, label: s.fullName})
            )}/>
        </div>
        {/*<select*/}
          {/*name="students"*/}
          {/*className='diagnostic-menu__select'*/}
          {/*onChange={handleChange}*/}
        {/*>*/}
          {/*<option value='default'>Выберите ученика</option>*/}
          {/*{students.map(({studentId, fullName})=>*/}
            {/*<option key={studentId} value={studentId}>{fullName}</option>)}*/}
        {/*</select>*/}
        {activeStudentId ?
        <div className='diagnostic-menu__list'>
          <h3 className='diagnostic-menu__h3'>
            Обследования
            <button
              className='diagnostic-menu__button_type_add'
              onClick={handleCreate}
              title='Добавить'
            >+</button>
          </h3>
          <div className="diagnostic-menu__table">
            <Table
              type='diagnostic'
              functions={{isRemove: true, isFill: true}}
              data={diagnostics}
              setData={setDiagnostics}
            />
          </div>
        </div>: null}
      </div> : null}
    </div>
  )
}