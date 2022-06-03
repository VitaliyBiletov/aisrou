import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSpeedReading} from '../../redux/actions/tasksActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPrint, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import Timer from "../timer/Timer";



export default function Analysis(props) {
  const [fontSize, setFontSize] = useState('1em')
  const [text, setText] = useState({})
  const diagInfo = JSON.parse(sessionStorage.getItem('diagInfo'))
  const {speed} = useSelector(state=>state.diagnostic.tasks.reading)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setText(props.texts.find(text => text.classNum === diagInfo.classNumber && text.type === diagInfo.type).text)
  }, [])

  const handlePrint = (e) => {
    const myWindow = window.open('PRINT', '')
    const printText = text.body.replace("|", "\n\t")
    myWindow.document.write(`<div><h2 style="text-align: center">${text.title ? text.title : ''}</h2><p style="text-align: justify; white-space: break-spaces;">${printText}</p><p style="text-align: right">${text.author ? text.author : ''}</p></div>`)
    myWindow.print()
    myWindow.close()
  }

  const handlePlus = (e) => {
    const newSize = parseFloat(fontSize) + 0.1
    setFontSize(`${newSize}em`)
  }

  const handleMinus = (e) => {
    const newSize = parseFloat(fontSize) - 0.1
    setFontSize(`${newSize}em`)
  }

  return (
    <div className='analysis'>
      <div className='print__container'>
        <button className='print__button status__btn-point' onClick={handlePlus}><FontAwesomeIcon icon={faPlus}/></button>
        <button className='print__button status__btn-point' onClick={handleMinus}><FontAwesomeIcon icon={faMinus}/></button>
        <button className='print__button status__btn-point' onClick={handlePrint}><FontAwesomeIcon icon={faPrint}/></button>
      </div>
      <div className="analysis__content">
        {text.title ? <p className='analysis__title'>{text.title}</p> : null}
        {text.body ? props.type === 'reading' ? <Text fontSize={fontSize} text={text.body}/> :
          <p className='analysis__text'>{text.body}</p> : null}
        {text.author ? <p className='analysis__author'>{text.author}</p> : null}
      </div>
      {props.type === 'reading' ?
      <div className='analysis__panel'>
        <Timer />
        <div className='analysis__speed'>
          {speed ?
            <>
              <span>Скорость:</span><span className='analysis__speed-count'>{speed} сл/мин</span>
            </> :
            <span>Выберите слово</span>
          }
        </div>
      </div> : null}
    </div>
  )
}

function Text(props) {
  const [activeWord, setActiveWord] = useState(-1)
  const {text} = props
  const dispatch = useDispatch()

  const handleClick = (e) => {
    setActiveWord(e.target.dataset.index)
    dispatch(setSpeedReading(Number(e.target.dataset.count) + 1))
  }

  let count = 0
  return <p className='analysis__text'>
    {text.trim().split(" ").map((i, index) => {
        if (i === "-") {
          count++
          return i
        }
        if (i[0] === "|") {
          i = i.slice(1)
          return (
            <React.Fragment key={index}>
              <br/>
              <span
                key={index}
                style={{fontSize: props.fontSize, marginLeft: "20px"}}
                className={`analysis__word ${index === Number(activeWord) ? "active-word" : null}`}
                data-index={index}
                data-count={index - count}
                onClick={handleClick}>
        {i}</span>
            </React.Fragment>
          )
        }
        return (
          <span
            key={index}
            style={{fontSize: props.fontSize}}
            className={`analysis__word ${index === Number(activeWord) ? "active-word" : null}`}
            data-index={index}
            data-count={index - count}
            onClick={handleClick}>
        {i}</span>
        )
      }
    )}
  </p>
}