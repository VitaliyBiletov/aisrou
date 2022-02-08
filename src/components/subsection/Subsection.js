import React from 'react'
import {classNames} from 'classnames'
import './style.sass'
import {connect} from 'react-redux'
import {setValueItem} from "../../redux/actions/subsectionActions";
import Explanation from "../explanation/Explanation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

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
      isVisibleExp: false
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
    const { name, data, section } = this.props
    const { activeItem } = this.state
    const length = data.length
    this.props.setValueItem(activeItem, section, name, Number(e.target.value))
    this.setNextItem(activeItem, length)
  }

  handleExpClick = (e) => {
    this.setState({isVisibleExp: !this.state.isVisibleExp})
  }

  render() {
    const { data, title, instruction, store, type, name } = this.props
    const {activeItem} = this.state
    return (
      <>
      <div className="subsection">
        <div className="subsection__header">
          <h2 className='subsection__header_h2'>{title}</h2>
        </div>
        <div className="subsection__description">
          <p className='subsection__description_p'>{
            !Array.isArray(instruction) ? instruction : instruction[activeItem]
          }</p>
        </div>
        <div className='subsection__content-section'>
            <Content activeItem={activeItem} data={data} type={type} name={name}/>
        </div>
        <div className="subsection__status-section">
          { data.map((item, index) =>{
              const result = store.find(i=>i.id === item.id)
              const color = result ? buttonsData.find(b=>result.value === b.id).color : 'white'
              return (
                <button
                  className={`subsection__btn-status subsection__btn-status_${color} ${this.state.activeItem === item.id ? 'subsection__btn-status subsection__btn-status_active' : null}`}
                  onClick={this.handleClick}
                  key={index}
                  value={item.id}
                  data-tooltip={item.title}
                />
              )
            }
          )}
        </div>
        <div className='subsection__points-section'>
          { buttonsData.map((item, index) =>
            <button
              className={`subsection__btn-point subsection__btn-point_${item.color}`}
              onClick={this.handleButtonClick}
              value={item.id}
              key={index} />
          )}
        </div>
        <FontAwesomeIcon className="subsection__btn-exp" onClick={this.handleExpClick} icon={this.state.isVisibleExp ? faAngleUp : faAngleDown} size="1x"/>
      </div>
        {
          this.state.isVisibleExp ?
            <Explanation hints={this.props.hints}/> :
            null
        }
      </>
    );
  }
}

const Content = ({activeItem, data, type, name}) => {
    switch (type){
        case 'small-text':{
            return <p className='subsection__small-text'>{data[activeItem].text}</p>
        }
        case 'text':{
            return (
                <>
                    <h3>{data[activeItem].title}</h3>
                    <p className='subsection__text'>{data[activeItem].text}</p>
                </>
            )
        }
        case 'img':{
            const src = `http://localhost:3000/static/images/${name}/${activeItem}.jpg`
            return <img className='subsection__img' src={src}/>
        }
        default: return null
    }
}

const mapStateToProps = (state, ownProps) => {
  const {section, name} = ownProps
  return {store: state.diag.subsections[section][name]}
}

const mapDispatchToProps = {
  setValueItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsection)