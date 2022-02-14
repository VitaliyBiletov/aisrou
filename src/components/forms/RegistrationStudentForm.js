import React, {useState} from 'react'
import './style.sass'
import {registration} from "../../http/managementAPI";

const DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'dateOfBirth', type: 'date', placeholder: 'Дата рождения'},
  {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'},
  {name: 'enrollmentСlass', type: 'text', placeholder: 'Класс зачисления'},
]

function RegistrationStudentForm(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    enrollmentDate: '',
    enrollmentСlass: ''
  })

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick() {
    await registration('student', formData)
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Регистрация</h2>
      <div className='modal__container'>
        <form className='modal__form form'>
          {DATA.map(data=>
            <input
              key={data.name}
              className='form__input'
              onChange={handleChange}
              placeholder={data.placeholder}
              name={data.name}
              type={data.type}
              value={formData[data.name]}
            />
          )}
        </form>
        <button className='form__button' onClick={handleClick}>Сохранить</button>
      </div>
    </div>
  )
}

export {RegistrationStudentForm}