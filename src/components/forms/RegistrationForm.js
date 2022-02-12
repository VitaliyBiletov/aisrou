import React, {useState} from 'react'
import './style.sass'
import {registration} from "../../http/userAPI";

function RegistrationForm(props) {
  const [formData, setFormData] = useState({})

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick(e) {
    e.preventDefault()
    const data = await registration(formData)
    console.log(data)
  }

  return (
    <div className='registration'>
      <h2 className='registration__h2'>Регистрация</h2>
      <div className='registration__container'>
        <form className='registration__form form'>
          {props.data.map(data=>
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

export {RegistrationForm}