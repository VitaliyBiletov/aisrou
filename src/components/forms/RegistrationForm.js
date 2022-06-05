import React, {useState, useEffect} from 'react'
import {registration} from "../../http/managementAPI"
import PropTypes from 'prop-types'
import {notify} from "../../utils/notify";
import {ToastContainer} from "react-toastify";

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
    {name: 'enrollmentDate', type: 'date', placeholder: 'Дата зачисления'}
]

//Форма регистрации. Отобржанеие в зависимоти от типа (пользователи, ученики)
export default function RegistrationForm(props) {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (props.type === 'users') {
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
        if (props.type === 'students') {
            setData(STUDENT_DATA)
            setFormData({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                enrollmentDate: ''
            })
        }
    }, [])

    function handleChange(e) {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleClick() {
        try {
            const res = await registration(props.type, formData)
            props.setData([...props.data, res])
            props.close()
        } catch (e) {
            const {error} = e.response.data
            notify("error", error)
        }
    }

    return (
        <div className='modal'>
            <ToastContainer/>
            <h2 className='modal__title'>Регистрация</h2>
            {formData ?
                <div className='modal__container'>
                    <form className='modal__form form'>
                        {data.map((data) => {
                                if (data.name === 'role') {
                                    return <select key={data.name} className='form__input' onChange={handleChange}
                                                   defaultValue="USER" name={data.name}>
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
                </div> : null}
        </div>
    )
}

RegistrationForm.propTypes = {
    type: PropTypes.string,
    data: PropTypes.array,
    fields: PropTypes.array,
    setData: PropTypes.func,
    close: PropTypes.func
}