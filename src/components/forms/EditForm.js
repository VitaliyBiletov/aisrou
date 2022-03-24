import React, {useState, useEffect} from 'react'
import {edit, get} from "../../http/managementAPI";

const USER_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
]

const STUDENT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'dateOfBirth', type: 'date', placeholder: 'Дата рождения'},
  {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'},
]

function EditForm(props) {
  const [formData, setFormData] = useState({})
  const [type, setType] = useState('')
  const [fields, setFields] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(async ()=>{
    try {
      setType(props.type)
      if (props.type ==='user'){
        setFields(USER_DATA)
      }
      if (props.type ==='student'){
        setFields(STUDENT_DATA)
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
    const {data} = await edit(type, props.activeItem, formData)
    const updatedData = props.data.map(item=>{
      if (item.id === Number(data.id)){
        return data
      }
      return item
    })
    props.setData(updatedData)
    // props.close()
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Редактирование</h2>
      <div className='modal__container'>
        {isLoading ?
            <form className='modal__form form'>
              {fields.map(field=>
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