import React from 'react'
import {classNames} from 'classnames'
import './style.sass'
import {connect} from 'react-redux'
import {setValueItem} from "./subsectionActions";

const buttonsData = [
  {id:0, color: "red"},
  {id:1, color: "yellow"},
  {id:2, color: "blue"},
  {id:3, color: "green"},
]

class Subsection extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      activeItem: 0,
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    const { value } = e.target
    this.setState({activeItem: Number(value)})
  }

  setNextItem = (index, length) => {
    return index < length - 1 ?
      this.setState({activeItem: index + 1}) :
      this.setState({activeItem: 0})
  }

  handleButtonClick = (e) => {
    e.preventDefault()
    const { name, data } = this.props
    const { activeItem } = this.state
    const length = data.length
    this.props.setValueItem(activeItem, name, Number(e.target.value))
    this.setNextItem(activeItem, length)
  }

  render() {
    const { data, title, instruction, store } = this.props

    return (
      <div className="subsection">
        <div className="subsection__header">
          <h2 className='subsection__header_h2'>{title}</h2>
        </div>
        <div className="subsection__description">
          <p className='subsection__description_p'>{instruction}</p>
        </div>
        <div className="subsection__status-section">
          { data.map((item, index) =>{
            const result = store.find(i=>i.id === item.id)
            const color = result ? buttonsData.find(b=>result.value === b.id).color : 'white'
            return (
              <button
                className={`subsection__btn-status subsection__btn-status_${color}`}
                onClick={this.handleClick}
                key={index}
                value={item.id}
                style={item.id === this.state.activeItem ? {'border': '2px solid red'} : null}
              />
            )
          }
          )}
         </div>
        <div className='subsection__content-section'>

        </div>
        <div className='subsection__points-section'>
          { buttonsData.map((item, index) =>
            <button
              className={`subsection__btn-point subsection__btn-point_${item.color}`}
              onClick={this.handleButtonClick}
              value={item.id}
              key={index}>{item.id}</button>) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {store: state.diag.subsections[ownProps.name]}
}

const mapDispatchToProps = {
  setValueItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsection)