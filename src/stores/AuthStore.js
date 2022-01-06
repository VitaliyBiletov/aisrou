import {makeAutoObservable} from "mobx";


class AuthStore {

    login = ''
    password = ''

    constructor(){
        makeAutoObservable(this)
    }

    setLogin(login){
        this.login = login
    }

    setPassword(password){
        this.password = password
    }
}

export default new AuthStore()