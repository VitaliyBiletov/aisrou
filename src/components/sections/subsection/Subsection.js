import React from 'react'
import {connect} from 'react-redux'
import {setActiveItem} from "../../../pages/diag/diagActions";

export default class Subsection extends React.Component {

  constructor(props){
    super(props)
  }

  handleClick = (e) => {
    e.preventDefault()
    const { name } = this.props
    const { value } = e.target
    this.props.setActiveItem(name, Number(value))
  }

  render() {
    const { data, title, instruction, store } = this.props
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
                style={store.activeItem === item.id ? {"border": "2px red solid"} : null}
              />)}
          </div>
        </div>
        <div>

        </div>
        <div><Buttons /></div>
      </div>
    );
  }
}

function Buttons(props){

  const buttonsData = [
    {id:0, color: "red"},
    {id:1, color: "yellow"},
    {id:2, color: "blue"},
    {id:3, color: "green"},
  ]

  const handleClick = (e) => {
    e.preventDefault()
  }

  return (
    <div style={{"display": "flex"}}>
      { buttonsData.map((item, index) => <button onClick={handleClick} style={{"backgroundColor": item.color}} key={index}>{item.id}</button>) }
    </div>
  )
}