import React from 'react';
import FIELDS from './Fields.json'
import {connect} from 'react-redux'
import {setValueStatFunc} from "../../../../components/subsection/subsectionActions";
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
        <div className="section stateOfFunc">
          <h1 className="section__header">Состояние функций</h1>
          <div className="section__container">
            <div className="stateOfFunc__form">
              {FIELDS.map((field, index) => (
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