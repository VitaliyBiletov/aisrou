import React from 'react'
import {remove} from "../../http/managementAPI";


function RemoveForm(props) {

  const handleRemove = (e) => {
    e.preventDefault()
    remove(props.type, props.activeItem)
    const filteredData = props.data.filter(item=>item.id !== props.activeItem)
    props.setData(filteredData)
    props.close()

  }

  const handleClose = (e) => {
    e.preventDefault()
    props.close()
  }

  return(
    <div className='modal'>
      <h2 className='modal__title'>Удаление</h2>
      <div className='modal__container'>
        <p className='modal__text'>Вы действительно хотите удалить?</p>
        <form className='modal__form form'>
          <button className='form__button form__button_yes' onClick={handleRemove}>Да</button>
          <button className='form__button form__button_no' onClick={handleClose}>Нет</button>
        </form>
      </div>
    </div>
  )
}

export {RemoveForm}