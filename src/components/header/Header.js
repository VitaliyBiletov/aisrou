import React from 'react'
import {LOGIN_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom/index";


function Header(props) {
  const navigate = useNavigate()

  const handleExit = () =>{
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }

  return(
    <header className='header'>
      <div className='header__logo'>
        <span className='header__logo_span'>АИСРОУ</span>
      </div>
      <div className='header__header-menu'>
        <div className='header__username'>{props.username}</div>
        <button
          className='header__button'
          onClick={handleExit}
        >Выход</button>
      </div>
    </header>
  )
}

export {Header}