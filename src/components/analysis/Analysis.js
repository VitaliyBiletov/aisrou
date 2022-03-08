import React, {useState, useRef, useEffect} from 'react'
import { Circle } from 'rc-progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStop, faPlay, faPrint, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import {TabList, Tab, Tabs, TabPanel} from 'react-tabs'
import useSound from 'use-sound'
import soundStop from '../../sounds/stop.mp3'
import _ from 'lodash'

let textTemplate = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab blanditiis cupiditate, dignissimos distinctio excepturi in laborum magnam nulla odit perspiciatis ratione, reprehenderit voluptates. Aliquid consequatur culpa, deserunt dolorem doloremque ea eligendi et eveniet, ex expedita iusto laboriosam laudantium molestias nihil nisi officiis omnis, quae rem reprehenderit tempora ullam ut voluptatum?"

export default function Analysis(props){
  const [count, setCount] = useState(0)
  const [sec, setSec] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [fontSize, setFontSize] = useState('1em')
  const [color, setColor] = useState('#6458a7')
  const [text, setText] = useState('')
  const [play] = useSound(soundStop)
  const time = 2

  useEffect(()=>{
    setText(textTemplate)
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
    myWindow.document.write(`<h1 style="text-align: center">Текст</h1><p>${text}</p></div>`)
    myWindow.print()
    myWindow.close()
  }

  const handlePlus = (e) => {
    const newSize = parseFloat(fontSize)+0.1
    setFontSize(`${newSize}em`)
  }

  const handleMinus = (e) => {
    const newSize = parseFloat(fontSize)-0.1
    setFontSize(`${newSize}em`)
  }

  return(
    <div className='subsection analysis'>
      <div className='subsection__header'>
        <h2 className='subsection__header_h2'>{props.title}</h2>
      </div>
      <div className="subsection__description">
        <p className='subsection__description_p'>{props.description}</p>
      </div>
      <div className='subsection__content-section'>
        <div>
          <div className='print__container'>
            <button className='print__button' onClick={handlePlus}><FontAwesomeIcon icon={faPlus}/></button>
            <button className='print__button' onClick={handleMinus}><FontAwesomeIcon icon={faMinus}/></button>
            <button className='print__button' onClick={handlePrint}><FontAwesomeIcon icon={faPrint}/></button>
          </div>
          {text ? <Text fontSize={fontSize} setCount={setCount} text={text}/> : null }
          <div className='analysis__panel'>
            <div className='analysis__timer timer'>
              <button className='timer__button timer__button_start' onClick={startTimer}><FontAwesomeIcon icon={faPlay}/></button>
              <button className='timer__button timer__button_stop' onClick={stopTimer}><FontAwesomeIcon icon={faStop}/></button>
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
            </div>
            <div className='analysis__skills'>
              <Tabs className="analysis__tabs" selectedTabClassName="analysis__tab_active">
                <TabList className='analysis__tab-list'>
                  {data.map(({name, title})=>
                    <Tab
                      className='analysis__tab'
                      key={name}
                      to={name}
                    >{title}</Tab>
                  )}
                  </TabList>
                  {data.map(({name, title, items})=>
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
      </div>
    </div>
  )
}


function SkillListTemplate(props) {
  const {data} = props
  const chunk = _.chunk(data, 5)
  return <div className='skills'>
    {chunk.map((c, index)=>{
      return <div key={index} className='skills__column'>
        {c.map(({name, title})=>{
          return <div key={name} className='analysis__checkbox'>
            <input type="checkbox" id={name} name={name}/>
            <label htmlFor={name}>{title}</label>
          </div>
        })}
      </div>
    })}
  </div>
}

function Text(props){
  const [activeWord, setActiveWord] = useState(-1)
  const {text} = props

  const handleClick = (e) => {
    setActiveWord(e.target.dataset.index)
    props.setCount(Number(e.target.dataset.index) + 1)
  }

  return <div className='text'>
    {text.trim().split(' ').map((i, index)=>
      <span
        key={index}
        style={{fontSize: props.fontSize}}
        className={index === Number(activeWord) ? "active-word": null}
        data-index={index}
        onClick={handleClick}>
        {i}</span>
    )}
  </div>
}

const data = [
  {
    "id": 0,
    "name": "reading-method",
    "title":"Способ чтения",
    "items":[
      {
        "id": 0,
        "name": "letterByLetter",
        "title": "Побуквенное"
      },
      {
        "id": 1,
        "name": "bySyllables",
        "title": "По слогам отрывисто"
      },
      {
        "id": 2,
        "name": "slowlyInSyllables",
        "title": "По слогам плавно"
      },
      {
        "id": 3,
        "name": "wholeWords",
        "title": "Целыми словами, в сложных случаях послоговое"
      },
      {
        "id": 4,
        "name": "phrases",
        "title": "Словосочетаниями"
      }
    ]},
  {
    "id": 1,
    "name": "right",
    "title":"Правильность",
    "items":[
      {
        "id": 0,
        "name": "passes",
        "title": "Пропуски"
      },
      {
        "id": 1,
        "name": "permutations",
        "title": "Перестановки"
      },
      {
        "id": 2,
        "name": "substitutions",
        "title": "Замены"
      },
      {
        "id": 3,
        "name": "additions",
        "title": "Добавления"
      },
      {
        "id": 4,
        "name": "replays",
        "title": "Повторы"
      },
      {
        "id": 5,
        "name": "sounds",
        "title": "Звуков"
      },
      {
        "id": 6,
        "name": "syllables",
        "title": "Слогов"
      },
      {
        "id": 7,
        "name": "words",
        "title": "Слов"
      },
      {
        "id": 8,
        "name": "wrongEmphasis",
        "title": "Неправильная постановка ударения"
      }
    ]
  },
  {
    "id": 3,
    "name": "expressiveness",
    "title":"Выразительность",
    "items":[
      {
        "id": 0,
        "name": "pausesOnPunctuationMarks",
        "title": "Паузы на знаках препинания"
      },
      {
        "id": 1,
        "name": "raiseAndLowerVoice",
        "title": "Повышение и понижение голоса"
      },
      {
        "id": 2,
        "name": "emphasizingImportantWords",
        "title": "Выделение голосом важных слов"
      }
    ]
  },
  {
    "id": 4,
    "name": "mindfulness",
    "title":"Осознанность",
    "items":[
      {
        "id": 0,
        "name": "literalSense",
        "title": "В прямом значении"
      },
      {
        "id": 1,
        "name": "figurativeMeaning",
        "title": "В переносном значении"
      },
      {
        "id": 2,
        "name": "storyEventChains",
        "title": "Цепочки событий сюжета"
      },
      {
        "id": 3,
        "name": "mainIdea",
        "title": "Главная мысль"
      }
    ]
  }
]
