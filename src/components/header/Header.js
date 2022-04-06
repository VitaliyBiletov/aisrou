import React, {useEffect} from 'react'
import {LOGIN_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom/index";
import {useSelector} from "react-redux";


function Header(props) {
  const navigate = useNavigate()
  const {fullName} = useSelector(state=>state.user)

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
        {fullName ?
          <div className='header__username'>
          {fullName}
        </div> : null }
        <div className='header__logout'>
          <button
            className='header__button'
            onClick={handleExit}
          >Выход</button>
        </div>

      </div>
    </header>
  )
}

export {Header}