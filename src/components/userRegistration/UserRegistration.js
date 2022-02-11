import React, {useState} from 'react'
import './style.sass'

function UserRegistration(props) {

  const initFormData = {
    firstName: '',
    lastName: '',
    patronymic: '',
    role: 'USER',
    email: '',
    password: '',
    password2: ''
  }

  const [formData, setFormData] = useState(initFormData)

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(formData)
  }

  return (
  <div className='registration'>
    <h2 className='registration__h2'>Регистрация</h2>
    <div className='registration__container'>
      <form className='registration__form form'>
        <input className='form__input' onChange={handleChange} placeholder="Имя" name="firstName" type="text"/>
        <input className='form__input' onChange={handleChange} placeholder="Фамилия" name="lastName" type="text"/>
        <input className='form__input' onChange={handleChange} placeholder="Отчество" name="patronymic" type="text"/>
        <input className='form__input' onChange={handleChange} placeholder="Email" name="email" type="text"/>
        <input className='form__input' onChange={handleChange} placeholder="Пароль" name="password" type="password"/>
        <input className='form__input' onChange={handleChange} placeholder="Повторите пароль" name="password2" type="password"/>
        <select className='form__input' onChange={handleChange} name="role" defaultValue={formData['role']}>
          <option value="ADMIN">Администратор</option>
          <option value="USER">Пользователь</option>
        </select>
        <button className='form__button' onClick={handleClick}>Сохранить</button>
      </form>
    </div>
  </div>
  )
}

export {UserRegistration}