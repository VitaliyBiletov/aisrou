import React, {useState} from 'react'
import {setUserPassword} from "../../http/managementAPI";
import PropTypes from 'prop-types';

//Форма изменения пароля
export default function SetPasswordForm(props) {
  const [password, setPassword] = useState(null)
  const [password2, setPassword2] = useState(null)

  const handleChangePassword = (e) =>{
    setPassword(e.target.value)
  }

  const handleChangePassword2 = (e) =>{
    setPassword2(e.target.value)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (password !== password2){
      return console.log('Пароли не совпадают')
    }
    await setUserPassword({id: props.activeItem, password})
    props.close()
  }

  return(
    <div className='modal'>
      <h2 className='modal__title'>Пароль</h2>
      <div className='modal__container'>
        <form className='modal__form form'>
          <input className='form__input' onChange={handleChangePassword} type="password" placeholder='Пароль'/>
          <input className='form__input' onChange={handleChangePassword2} type="password" placeholder='Повторите пароль'/>
          <button className='form__button' onClick={handleClick}>Сохранить</button>
        </form>
      </div>
    </div>
  )
}