import React, {useState, useEffect} from 'react'
import {edit, get} from "../../http/managementAPI";

const USER_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
]

const STUDENT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'dateOfBirth', type: 'date', placeholder: 'Дата рождения'},
  {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'},
  {name: 'enrollmentСlass', type: 'text', placeholder: 'Класс зачисления'},
]

function EditForm(props) {
  const [formData, setFormData] = useState({})
  const [type, setType] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async ()=>{
    try {
      setType(props.type)
      if (props.type ==='user'){
        setData(USER_DATA)
      }
      if (props.type ==='student'){
        setData(STUDENT_DATA)
      }
      const data = await get(props.type, props.activeItem)
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
    await edit(type, props.activeItem, formData)
    props.close()
    props.updateData()
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Редактирование</h2>
      <div className='modal__container'>
        {isLoading ?
            <form className='modal__form form'>
              {data.map(field=>
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
              {type === 'user' ?
                <select className='form__input' onChange={handleChange} value={formData['role']} name="role">
                  <option value="ADMIN">Администратор</option>
                  <option value="USER">Пользователь</option>
                </select>
                : null}
              <button className='form__button' onClick={handleClick}>Сохранить</button>
            </form> : <p>Загрузка</p>
        }
      </div>
    </div>
  )
}

export {EditForm}