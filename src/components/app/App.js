import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Auth from '../../pages/auth/Auth'
import Diag from "../../pages/diagnostic/Diagnostic";
import AppRouter from "./AppRouter";

export default class App extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
      return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
      )
    }
}
