import React, {useState, useRef, useEffect, Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSpeedReading, setReadingSkill} from '../../redux/actions/tasksActions'
import {Circle} from 'rc-progress';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStop, faPlay, faPrint, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import {TabList, Tab, Tabs, TabPanel} from 'react-tabs'
import useSound from 'use-sound'
import soundStop from '../../sounds/stop.mp3'
import _ from 'lodash'
import data from './data'


export default function Analysis(props) {
  const [count, setCount] = useState(0)
  const [sec, setSec] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [fontSize, setFontSize] = useState('1em')
  const [color, setColor] = useState('#6458a7')
  const [text, setText] = useState('')
  const [play] = useSound(soundStop)
  const diagInfo = JSON.parse(sessionStorage.getItem('diagInfo'))
  const time = 2

  useEffect(() => {
    setText(props.texts.find(text => text.classNum === diagInfo.classNumber && text.type === diagInfo.typeId).text)
  }, [])

  const startTimer = (e) => {
    setColor('#6458a7')
    setCount(0)
    setSec(0)
    let timer = 0
    if (!intervalId) {
      const intervalId = setInterval((e) => {
        timer++
        if (timer === time) {
          setSec(100)
          setColor('#228325')
          setIntervalId(null)
          play()
          return clearInterval(intervalId)
        }
        setSec(sec => sec + 100 / time)
      }, 1000)
      setIntervalId(intervalId)
    }
  }

  const stopTimer = (e) => {
    setSec(0)
    setCount(0)
    setColor('#6458a7')
    clearInterval(intervalId)
  }

  const handlePrint = (e) => {
    const myWindow = window.open('PRINT', '')
    const printText = text.body.replace("|","\n\t")
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
        <button className='print__button' onClick={handlePlus}><FontAwesomeIcon icon={faPlus}/></button>
        <button className='print__button' onClick={handleMinus}><FontAwesomeIcon icon={faMinus}/></button>
        <button className='print__button' onClick={handlePrint}><FontAwesomeIcon icon={faPrint}/></button>
      </div>
      <div className="analysis__content">
        {text.title ? <p className='analysis__title'>{text.title}</p> : null }
        {text.body ? props.type === 'reading' ? <Text fontSize={fontSize} setCount={setCount} text={text.body}/> : <p className='analysis__text'>{text.body}</p> : null}
        {text.author ? <p className='analysis__author'>{text.author}</p> : null}
      </div>
      <div className='analysis__panel'>
        {props.type === 'reading' ?
          <div className='analysis__timer timer'>
            <button className='timer__button timer__button_start' onClick={startTimer}><FontAwesomeIcon icon={faPlay}/>
            </button>
            <button className='timer__button timer__button_stop' onClick={stopTimer}><FontAwesomeIcon icon={faStop}/>
            </button>
            <div className="timer__progress">
              <Circle percent={sec} strokeWidth="7" strokeColor={color}/>
            </div>
            <div className='analysis__speed'>
              {count ?
                <>
                  <span>Скорость:</span><span className='analysis__speed-count'>{count} сл/мин</span>
                </> :
                <span>Выберите слово</span>
              }
            </div>
          </div> : null}
        <div className='analysis__skills'>
          <Tabs className="analysis__tabs" selectedTabClassName="analysis__tab_active">
            <TabList className='analysis__tab-list'>
              {props.options.map(({name, title}) =>
                <Tab
                  className='analysis__tab'
                  key={name}
                  to={name}
                >{title}</Tab>
              )}
            </TabList>
            {props.options.map(({name, title, items}) =>
              <TabPanel
                className="analysis__tab-panel"
                selectedClassName="analysis__tab-panel_selected"
                key={name}>
                <SkillListTemplate data={items}/>
              </TabPanel>)}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function SkillListTemplate(props) {
  const {data} = props
  const chunk = _.chunk(data, 5)
  const {reading} = useSelector(({diagnostic}) => diagnostic.tasks)
  const dispatch = useDispatch()

  const handleChecked = (name) => (e) => {
    dispatch(setReadingSkill(name, e.target.checked))
  }

  useEffect(() => {
  }, [])

  return <div className='skills'>
    {chunk.map((c, index) => {
      return <div key={index} className='skills__column'>
        {c.map(({name, title}) => {
          const skill = reading.skills.find((skill) => skill.name === name)
          return <div key={name} className='analysis__checkbox'>
            <input type="checkbox" defaultChecked={skill ? skill.value : false} onClick={handleChecked(name)} id={name}
                   name={name}/>
            <label htmlFor={name}>{title}</label>
          </div>
        })}
      </div>
    })}
  </div>
}

function Text(props) {
  const [activeWord, setActiveWord] = useState(-1)
  const {text} = props
  const dispatch = useDispatch()

  const handleClick = (e) => {
    setActiveWord(e.target.dataset.index)
    props.setCount(Number(e.target.dataset.count) + 1)
    dispatch(setSpeedReading(Number(e.target.dataset.count) + 1))
  }

  let count = 0
  return <p className='analysis__text'>
    {text.trim().split(" ").map((i, index) => {
      if (i === "-"){
        count ++
        return i
      }
      if (i[0] === "|"){
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