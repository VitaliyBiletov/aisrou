import React, {useState, useEffect} from 'react'
import './style.sass'
import {edit, get} from "../../http/managementAPI";

const INPUT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
]

function EditUserForm(props) {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async ()=>{
    try {
      const data = await get('user', props.activeItem)
      console.log('data',data)
      setFormData(data)
      setIsLoading(true)
    } catch (e) {
      console.log("err",e)
    }
  }, [])

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick(e) {
    e.preventDefault()
    await edit('user', props.activeItem, formData)
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Редактирование</h2>
      <div className='modal__container'>
        {isLoading ?
          <>
            <form className='modal__form form'>
              {INPUT_DATA.map(field=>
              <input
                key={field.name}
                className='form__input'
                onChange={handleChange}
                placeholder={field.placeholder}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
              />
              )}
              <select className='form__input' onChange={handleChange} value={formData['role']} name="role">
                <option value="ADMIN">Администратор</option>
                <option value="USER">Пользователь</option>
              </select>
              <button className='form__button' onClick={handleClick}>Сохранить</button>
            </form>
          </> : <p>Загрузка</p>
        }
      </div>
    </div>
  )
}

export {EditUserForm}