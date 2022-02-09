import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../http/userAPI'
import {ADMIN_ROUTE, DIAGNOSTIC_ROUTE} from "../../utils/const";


export default function LoginForm(){
  const [email, setEmail] = useState('vitaxa17@yandex.ru')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, password)
      if (res.role === "USER"){
        navigate(DIAGNOSTIC_ROUTE)
      }
      if (res.role === "ADMIN"){
        navigate(ADMIN_ROUTE)
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
    <div>
      <form>
          <input
              type='text'
              onChange={handleChangeLogin}
              value={email}
          />
          <input
              type='password'
              onChange={handleChangePassword}
              value={password}
          />
          <button
              onClick={handleClick}
          >Войти</button>
      </form>
      <div>{error}</div>
    </div>
  )
}