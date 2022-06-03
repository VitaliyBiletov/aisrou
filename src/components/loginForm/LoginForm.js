import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import {login} from '../../http/userAPI'
import {ADMIN_USERS_ROUTE, DIAGNOSTIC_MENU_ROUTE} from "../../utils/const";
import {setUser} from "../../redux/actions/userActions";
import {ToastContainer, toast} from "react-toastify";

export default function LoginForm() {
    const [email, setEmail] = useState('vitaxa17@yandex.ru')
    const [password, setPassword] = useState('1234')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notify = (type, text) => {
        const options = {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        switch (type) {
            case "success":
                toast.success(text, options)
                break
            case "error":
                toast.error(text, options)
                break
            default:
                toast.info('Неизвестная ошибка', options)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const res = await login(email, password)
            dispatch(setUser(res))

            if (res.role === "USER") {
                navigate(DIAGNOSTIC_MENU_ROUTE)
            }
            if (res.role === "ADMIN") {
                navigate(ADMIN_USERS_ROUTE)
            }
        } catch (e) {
            const {error} = e.response.data
            notify("error", error)
        }
    }

    const handleChangeLogin = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="login">
            <ToastContainer/>

            <form className="login__form">
                <label
                    htmlFor="email"
                    className="login__label"
                >Email: </label>
                <input
                    type='text'
                    id="email"
                    className="login__input login__email"
                    onChange={handleChangeLogin}
                    value={email}
                />
                <label
                    htmlFor="password"
                    className="login__label"
                >Пароль: </label>
                <input
                    type='password'
                    id="password"
                    className="login__input login__password"
                    onChange={handleChangePassword}
                    value={password}
                />
                <button
                    className="login__submit"
                    onClick={handleClick}
                >Войти
                </button>
            </form>
        </div>
    )
}