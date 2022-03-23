import React, {useState, useEffect} from 'react'
import {registration} from "../../http/managementAPI";

const USER_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
  {name: 'password', type: 'password', placeholder: 'Пароль'},
  {name: 'password2', type: 'password', placeholder: 'Повторите пароль'},
  {name: 'role', type: 'select', placeholder: 'Тип'},
]

const STUDENT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'dateOfBirth', type: 'date', placeholder: 'Дата рождения'},
  {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'},
  {name: 'enrollmentСlass', type: 'text', placeholder: 'Класс зачисления'},
]

function RegistrationForm(props) {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(()=>{
    if (props.type === 'user'){
      setData(USER_DATA)
      setFormData({
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        password: '',
        password2: '',
        role: 'USER',
      })
    }
    if (props.type === 'student'){
      setData(STUDENT_DATA)
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        enrollmentDate: '',
        enrollmentСlass: ''
      })
    }
  }, [])

  function handleChange(e) {
    e.preventDefault()
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleClick() {
    const res = await registration(props.type, formData)
    const record = {id: res.id, fieldsData: props.fields.map(field=>
        ({name: field.name, value: formData[field.name]}))
      }
    props.setData([...props.data, record])
    props.close()
  }

  return (
    <div className='modal'>
      <h2 className='modal__title'>Регистрация</h2>
      {formData ?
      <div className='modal__container'>
        <form className='modal__form form'>
          {data.map((data)=>{
            if (data.name === 'role'){
              return <select key={data.name} className='form__input' onChange={handleChange} defaultValue="USER" name={data.name}>
                <option disabled>Выберите роль</option>
                <option value="ADMIN">Администратор</option>
                <option value="USER">Пользователь</option>
              </select>
            }
            return <input
              key={data.name}
              className='form__input'
              onChange={handleChange}
              placeholder={data.placeholder}
              name={data.name}
              type={data.type}
              value={formData[data.name]}
            />
          }
          )}
        </form>
        <button className='form__button' onClick={handleClick}>Сохранить</button>
      </div> : null }
    </div>
  )
}

export {RegistrationForm}