import React, {useRef, useEffect} from 'react'
import './style.sass'
import {getAll} from "../../http/managementAPI";

function Table(props) {
  const {activeItem, setActiveItem} = props
  return props.data[0] ?
    <div className='table'>
      <div className='table__container'>
        <table className='table__table'>
          <thead className='table__thead thead'>
          <tr className='thead__tr'>
            {Object.keys(props.data[0]).map(key=>
              <th key={key} className='thead__th'>{key}</th>
            )}
          </tr>
          </thead>
          <tbody className='table__tbody tbody'>
          {props.data.sort((a,b)=>a.id > b.id ? 1 : -1 ).map((user)=>
            <tr
              key={user.id}
              data-value={user.id}
              onClick={()=>setActiveItem(user.id)}
              className={`${activeItem === user.id ? 'tbody__tr_active' : ''} tbody__tr`}
            >
              {Object.entries(user).map(([key,value])=>
                <td key={key} className='tbody__td'>{value}</td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
  </div> : <p>Отсутствуют данные</p>
}

export default Table