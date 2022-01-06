import React from 'react'
import Auth from '../../pages/auth/Auth'
import { observer } from 'mobx-react'
import {Diag} from "../../pages/diag/Diag";

class App extends React.Component{

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

export default observer(App);
