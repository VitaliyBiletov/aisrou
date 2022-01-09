import React from 'react'
import LoginForm from '../../components/loginForm/LoginForm'


export default class Auth extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <h2>Старница входа</h2>
                <LoginForm />
            </div>
        )
    }
}