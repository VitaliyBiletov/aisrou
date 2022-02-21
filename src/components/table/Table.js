import React, {useState} from 'react'
import './style.sass'
import {faTrash, faKey, faPen} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";


function Table(props) {
  const {activeItem, setActiveItem} = props

  if (props.data[0]){
    return (
      <div className='table'>
        <div className='table__container'>
          <table className='table__table'>
            <thead className='table__thead thead'>
            <tr className='thead__tr'>
              {Object.keys(props.data[0]).map(key=>
                <th key={key} className='thead__th'>{key}</th>
              )}
              <th />
              {props.type === "user" || props.type === "student" ?
              <th /> : null}
              {props.type === "user" ? <th /> : null}
            </tr>
            </thead>
            <tbody className='table__tbody tbody'>
            {props.data.sort((a,b)=>a.id > b.id ? 1 : -1 ).map((item)=>
              <tr
                key={item.id}
                data-value={item.id}
                onClick={()=>setActiveItem(item.id)}
                className={`${activeItem === item.id ? 'tbody__tr_active' : null} tbody__tr`}
              >
                {Object.entries(item).map(([key,value])=>
                  <td key={key} className='tbody__td'>{value}</td>
                )}
                {props.type === "user" || props.type === "student" ?
                <td className={`tbody__td tbody__td_func`}>
                  <button
                    title='Редактировать'
                    className='tbody__button tbody__button_type_edit'
                    onClick={props.handleEdit}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td> : null
                }
                {props.type === "user" ?
                <td className={`tbody__td tbody__td_func`}>
                  <button
                    title='Сбросить пароль'
                    className='tbody__button tbody__button_type_reset-password'
                    onClick={props.handleResetPassword}>
                    <FontAwesomeIcon icon={faKey} />
                  </button>
                </td> : null
                }
                <td className={`tbody__td tbody__td_func`}>
                  <button
                    title='Удалить'
                    className='tbody__button tbody__button_type_remove'
                    onClick={props.handleRemove}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return <p>Данные отстутствуют</p>
  }

}

export default Table