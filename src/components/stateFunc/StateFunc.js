import React from 'react';
import {connect} from 'react-redux'
import {setValueStatFunc} from "../subsection/subsectionActions";
import './style.sass'

class StateFunc extends React.Component{

  constructor(props){
    super(props)
  }

  handleChange = (e) => {
    this.props.setValueStatFunc(e.target.name, e.target.value)
  }

  render(){
    return (
          <div className="section__container">
            <div className="stateOfFunc__form">
              {this.props.data.map((field, index) => (
                  <div className="stateOfFunc__item" key={index}>
                    <label className="stateOfFunc__label">{field.title}</label>
                    <textarea
                      className="stateOfFunc__text-area"
                      onChange={this.handleChange}
                      name={field.name}
                      title={field.title}
                      value={this.props.store[field.name]}
                    />
                  </div>
                )
              )
            }
            </div>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {store: state.diag.subsections.stateOfFunc}
}

const mapDispatchToProps = {
  setValueStatFunc
}

export default connect(mapStateToProps, mapDispatchToProps)(StateFunc)