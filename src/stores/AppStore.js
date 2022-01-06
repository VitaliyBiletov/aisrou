import {makeAutoObservable} from "mobx";


class AppStore {

    constructor(){
        makeAutoObservable(this)
    }

}

export default new AppStore()