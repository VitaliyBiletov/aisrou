import React from 'react';


export default class LoginForm extends React.Component{

    constructor(props){
        super(props)
    }

    handleClick = (e) => {
        e.preventDefault()
    }

    handleChangeLogin = (e) => {

    }

    handleChangePassword = (e) => {

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