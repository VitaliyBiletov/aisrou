import React, {useState, useEffect} from 'react'
import './style.sass'
import {registration} from "../../http/managementAPI";

const INPUT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
  {name: 'password', type: 'password', placeholder: 'Пароль'},
  {name: 'password2', type: 'password', placeholder: 'Повторите пароль'},
]

function RegistrationUserForm(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    password: '',
    password2: '',
    role: 'USER',
  })

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick() {
    await registration('user', formData)
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Регистрация</h2>
      <div className='modal__container'>
        <form className='modal__form form'>
          {INPUT_DATA.map(data=>
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
          <select className='form__input' onChange={handleChange} defaultValue="USER" name="role">
            <option disabled>Выберите роль</option>
            <option value="ADMIN">Администратор</option>
            <option value="USER">Пользователь</option>
          </select>
        </form>
        <button className='form__button' onClick={handleClick}>Сохранить</button>
      </div>
    </div>
  )
}

export {RegistrationUserForm}