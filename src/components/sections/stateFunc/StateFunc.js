import React from 'react';
import Fields from './Fields.json'

export default class StateFunc extends React.Component{

  constructor(props){
    super(props)
  }

  render(){
    return (
        <div>{
          Fields.map((field, index) => (
              <div key={index}>
                <label>{field.title}</label>
                <textarea
                  name={field.name}
                  title={field.title}
                />
              </div>
            )
          )
        }
        </div>
    )
  }
}