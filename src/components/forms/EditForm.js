import React, {useState, useEffect} from 'react'
import './style.sass'
import {getUser, editUser} from "../../http/userAPI";

function EditForm(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    role: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState('')

  useEffect(async ()=>{
    try {
      const data = await getUser(props.activeUser)
      setFormData(data)
      setIsLoading(false)
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
    try {
      const result = await editUser(props.activeUser, formData)
      props.closeModal()
    } catch (e) {
      setErrors(e.response.data)
    }
  }

  return (
    <div className='registration'>
      <h2 className='registration__h2'>Редактирование</h2>
      <div className='registration__container'>
        {!isLoading ?
          <>
            <form className='form'>
              {props.data.map(field=>
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
            <ul className='form__errors'>
                <p>{errors.message}</p>
            </ul>
        </> : <p>Загрузка</p>
        }
      </div>
    </div>
  )
}

export {EditForm}