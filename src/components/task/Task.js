import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setValueItem} from '../../redux/actions/tasksActions'
import Analysis from "../analysis/Analysis";
import Explanation from "../explanation/Explanation";

export function Task(props) {
  const {data, type, name, activeItem, setActiveItem} = props

  switch (type) {
    case 'text': {
      return (
        <>
          {data.map((item, index) => <p key={index} className='task__text'>{item.text}</p>)}
          <Status {...props} activeItem={activeItem} setActiveItem={setActiveItem}/>
        </>
      )
    }
    case 'img': {
      return (
        <>
          <img src={`http://localhost:3000/static/images/${name}/${activeItem}.jpg`}/>
          <Status {...props} activeItem={activeItem} setActiveItem={setActiveItem}/>
        </>
      )
    }
    case 'small-text': {
      return (
        <>
          <p className='task__small-text'>{data[activeItem].text}</p>
          <Status {...props} activeItem={activeItem} setActiveItem={setActiveItem}/>
        </>
      )
    }
    case 'reading': {
      return <Analysis type='reading' texts={props.texts} options={props.options}/>
    }
    case 'writing': {
      return <Analysis type='writing' texts={props.texts}/>
    }
    default:
      return <div>{type}</div>
  }
}

export function generatedTask(Component, {...props}) {
  const {type} = props
  const [activeItem, setActiveItem] = useState(0)
  const [title, setTitle] = useState('')
  const [instruction, setInstruction] = useState('')
  const {typeId, classNumber} = useSelector(state => state.diagnostic.info.data)

  useEffect(()=>{
    if (props.type === "writing" && Array.isArray(props.title)){
      const {title} = props.title.find(t=>t.classNumber === classNumber && t.typeId === typeId)
      setTitle(title)
    } else {
      setTitle(props.title)
    }
    if (props.type === "writing" && Array.isArray(props.instruction)){
      const {instruction} = props.instruction.find(t=>t.classNumber === classNumber && t.typeId === typeId)
      setInstruction(instruction)
    } else {
      setInstruction(props.instruction)
    }
  },[])

  return (
    <div className='task'>
      <div className="task__header">

        <h2 className='task__header_h2'>{title}</h2>
      </div>
      <div className="task__description">
        <p className='task__description_p'>
          {!Array.isArray(instruction) ? instruction : instruction[activeItem]}
        </p>
      </div>
      <div className='task__content-section'>
        <Component {...props} activeItem={activeItem} setActiveItem={setActiveItem}/>
      </div>
      {props.hints ? <Explanation hints={props.hints}/> : null }
    </div>
  )
}

function Status({...props}) {
  const {data, name, nameSection, activeItem, setActiveItem} = props
  const state = useSelector(state => state.diagnostic.tasks[nameSection][name])
  const dispatch = useDispatch()
  const buttonsData = [
    {id: 0, color: "red"},
    {id: 1, color: "yellow"},
    {id: 2, color: "blue"},
    {id: 3, color: "green"},
  ]

  const handleClick = (e) => {
    e.preventDefault()
    const {value} = e.target
    setActiveItem(Number(value))
  }

  const setNextItem = (index, length) => {
    return index < length - 1 ?
      setActiveItem(index + 1) :
      setActiveItem(0)
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    dispatch(setValueItem(activeItem, nameSection, name, Number(e.target.value)))
    setNextItem(activeItem, data.length)
  }

  return (
    <div className='status'>
      <div className="status__status-section">
        {data.map((item, index) => {
            const result = state.find(i => i.id === item.id)
            const color = result ? buttonsData.find(b => result.value === b.id).color : 'white'
            return (
              <button
                className={`status__btn-status status__btn-status_${color} ${activeItem === item.id ? 'status__btn-status status__btn-status_active' : ''}`}
                key={index}
                value={item.id}
                onClick={handleClick}
                data-tooltip={item.title}
              />
            )
          }
        )}
      </div>
      <div className='status__points-section'>
        {buttonsData.map((item, index) =>
          <button
            className={`status__btn-point status__btn-point_${item.color}`}
            value={item.id}
            onClick={handleButtonClick}
            key={index}/>
        )}
      </div>
    </div>
  )
}