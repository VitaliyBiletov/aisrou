import React, {useState, useEffect} from 'react'
import './style.sass'
import {getAll} from "../../http/userAPI";

const HEADERS = ['id', 'Фамилия', 'Имя', 'Отчество', 'Email', 'Роль']

function Table(props) {
  const {activeUser, setActiveUser} = props
  return(
    <div className='table'>
      <div className='table__container'>
        <table className='table__table'>
          <thead className='table__thead thead'>
            <tr className='thead__tr'>
              {HEADERS.map(key=>
                <th key={key} className='thead__th'>{key}</th>
              )}
            </tr>
          </thead>
          <tbody className='table__tbody tbody'>
          {props.users.sort((a,b)=>a.id > b.id ? 1 : -1 ).map((user)=>
            <tr
              key={user.id}
              data-value={user.id}
              onClick={()=>setActiveUser(user.id)}
              className={`${activeUser === user.id ? 'tbody__tr_active' : null} tbody__tr`}
            >
              {Object.entries(user).map(([key,value])=>
                <td key={key} className='tbody__td'>{value}</td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table