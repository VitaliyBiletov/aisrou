import React from 'react'
import { Auth } from '../../pages/auth/Auth'

class App extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
      return (
          <div className='container'>
              <Auth/>
          </div>
      );
    }
}

export default App;
