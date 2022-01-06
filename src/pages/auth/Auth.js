import React from 'react'
import {LoginForm} from '../../components/loginForm/LoginForm'
import {observer} from "mobx-react/dist/index";


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

export default observer(Auth);