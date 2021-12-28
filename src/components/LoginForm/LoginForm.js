import React from 'react';


class LoginForm extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <form>
                <input type='text'/>
                <input type='password'/>
                <button>Войти</button>
            </form>
        )
    }
}

export { LoginForm }