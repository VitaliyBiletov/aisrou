import React from 'react';
import AuthStore from '../../stores/AuthStore'


class LoginForm extends React.Component{

    constructor(props){
        super(props)
    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.increase()
    }

    handleChangeLogin = (e) => {
        AuthStore.setLogin(e.target.value)
    }

    handleChangePassword = (e) => {
        AuthStore.setPassword(e.target.value)
    }

    render(){
        return (
            <form>
                <input
                    type='text'
                    onChange={this.handleChangeLogin}
                />
                <input
                    type='password'
                    onChange={this.handleChangePassword}
                />
                <button
                    onClick={this.handleClick}
                >Войти</button>
            </form>
        )
    }
}

export { LoginForm }