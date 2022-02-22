import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {login} from '../../http/userAPI'
import {ADMIN_USERS_ROUTE, DIAGNOSTIC_MENU_ROUTE} from "../../utils/const";
import {setUser} from "../../redux/actions/userActions";

export default function LoginForm(){
  const [email, setEmail] = useState('vitaxa17@yandex.ru')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      dispatch(setUser(res))

      if (res.role === "USER"){
        navigate(DIAGNOSTIC_MENU_ROUTE)
      }
      if (res.role === "ADMIN"){
        navigate(ADMIN_USERS_ROUTE)
      }
    } catch (e) {
      const {message} = e.response.data
      setError(message)
    }
  }

  const handleChangeLogin = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="login">
      <form className="login__form">
        <label
          htmlFor="email"
          className="login__label"
        >Email: </label>
        <input
            type='text'
            id="email"
            className="login__input login__email"
            onChange={handleChangeLogin}
            value={email}
        />
        <label
          htmlFor="password"
          className="login__label"
        >Пароль: </label>
        <input
            type='password'
            id="password"
            className="login__input login__password"
            onChange={handleChangePassword}
            value={password}
        />
        <button
          className="login__submit"
          onClick={handleClick}
        >Войти</button>
      </form>
      <div>{error}</div>
    </div>
  )
}