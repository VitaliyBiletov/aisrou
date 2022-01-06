import React from 'react'
import {observer} from 'mobx-react'
import classNames from 'classnames'
import DiagStore from "../../../stores/DiagStore.js"

const Subsection = observer(class Subsection extends React.Component {

  constructor(props){
    super(props)
  }

  handleClick = (e) => {
    e.preventDefault()
    const { name } = this.props
    const { value } = e.target
    DiagStore.SensoMotorStore.setActive(name, value)
  }

  render() {
    const { data, name, title, instruction } = this.props
    const { subsectionsData } = DiagStore.SensoMotorStore
    return (
      <div className="subsection">
        <p>Активный:{name ? subsectionsData[name].activeId : 0}</p>
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
                style={subsectionsData[name].activeId === index ? {"border": "2px solid red"} : null}
                onClick={this.handleClick}
                key={index}
                value={item.id}
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
)

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

export default Subsection