import React from 'react'
import Auth from '../../pages/auth/Auth'
import Diag from "../../pages/diag/Diag";

export default class App extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
      return (
          <div className='container'>
              <Diag/>
          </div>
      );
    }
}
