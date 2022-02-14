import React, {useState, useEffect} from 'react'

import './style.sass'
import {edit, get} from "../../http/managementAPI";

const STUDENT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'dateOfBirth', type: 'date', placeholder: 'Дата рождения'},
  {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'},
  {name: 'enrollmentСlass', type: 'text', placeholder: 'Класс зачисления'},
]

function EditStudentForm(props) {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async ()=>{
    try {
      const data = await get('student', props.activeItem)
      setFormData(data)
      setIsLoading(false)
    } catch (e) {
      console.log("err",e)
    }
  }, [])

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick(e) {
    e.preventDefault()
    await edit('student', props.activeItem, formData)
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Редактирование</h2>
      <div className='modal__container'>
        {!isLoading ?
          <>
            <form className='modal__form form'>
              {DATA.map(field=>
                <input
                  key={field.name}
                  className='form__input'
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                />
              )}
              <button className='form__button' onClick={handleClick}>Сохранить</button>
            </form>
        </> : <p>Загрузка</p>
        }
      </div>
    </div>
  )
}

export {EditStudentForm}