import React from 'react'
import LoginForm from '../../components/loginForm/LoginForm'

export default function Auth(){
  return (
      <div className="auth">
          <h2 className="auth__title">{process.env.REACT_APP_TITLE}</h2>
          <LoginForm />
      </div>
  )
}