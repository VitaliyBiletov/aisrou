import React from 'react'
import {classNames} from 'classnames'
import './style.sass'
import _ from 'lodash'
import {connect} from 'react-redux'
import {setActiveItem, setNextItem, setValueItem} from "../../../pages/diag/diagActions";

const buttonsData = [
  {id:0, color: "red"},
  {id:1, color: "yellow"},
  {id:2, color: "blue"},
  {id:3, color: "green"},
]

class Subsection extends React.Component {

  constructor(props){
    super(props)
  }

  handleClick = (e) => {
    e.preventDefault()
    const { name } = this.props
    const { value } = e.target
    this.props.setActiveItem(name, Number(value))
  }

  handleButtonClick = (e) => {
    e.preventDefault()
    const { name, data, store } = this.props
    const count = data.length
    this.props.setValueItem(store.activeItem, name, Number(e.target.value))
    this.props.setNextItem(name, count)
  }

  render() {
    const { data, name, title, instruction, store } = this.props
    console.log(store)
    return (
      <div className="subsection">
        <p>{store.activeItem}</p>
        <div className="subsection_header">
          <h2>{title}</h2>
        </div>
        <div className="subsection_description">
          <p>{instruction}</p>
        </div>
        <div className="subsection_status-bar">
          <div style={{"display": "flex"}}>
            { data.map((item, index) =>
              <button
                onClick={this.handleClick}
                key={index}
                value={item.id}
                style={item.id === store.activeItem ? {'border': '2px solid red'} : null}
              />)}
          </div>
        </div>
        <div>

        </div>
        <div style={{"display": "flex"}}>
          { buttonsData.map((item, index) => <button onClick={this.handleButtonClick} style={{"backgroundColor": item.color}} value={item.id} key={index}>{item.id}</button>) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { sensMotor } = state.diag
  return { store: sensMotor[ownProps.name] }
}

const mapDispatchToProps = {
  setActiveItem,
  setNextItem,
  setValueItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsection)