import React from 'react'
import {LoginForm} from '../../components/LoginForm/LoginForm'


class Auth extends React.Component{

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

export { Auth }