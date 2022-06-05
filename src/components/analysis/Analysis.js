import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setSpeedReading} from '../../redux/actions/tasksActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPrint, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import Timer from "../timer/Timer";
import PropTypes from 'prop-types';


//Компонент для задания в разделах "Чтение", "Письмо". Окно с текстом
export default function Analysis(props) {
    const [fontSize, setFontSize] = useState('1em') //размер шрифта текста
    const [text, setText] = useState({}) //текст в окне задания
    const diagnosticInfo = JSON.parse(sessionStorage.getItem('diagInfo')) //информация о диагностике (класс и тип)
    const {speed} = useSelector(state => state.diagnostic.tasks.reading) //скорость чтение в разделе "Чтения"

    //При монтировании компонента загружаем определенный текст, зависящий от класса и типа диагностики (первичная и вторичная)
    useEffect(() => {
        setText(props.texts.find(text => text.classNum === diagnosticInfo.classNumber && text.type === diagnosticInfo.type).text)
    }, [])

    //Событие при нажатии на кнопку печати
    const handlePrint = () => {
        const myWindow = window.open('PRINT', '')
        const printText = text.body.replace("|", "\n\t")
        myWindow.document.write(`<div><h2 style="text-align: center">${text.title ? text.title : ''}</h2><p style="text-align: justify; white-space: break-spaces;">${printText}</p><p style="text-align: right">${text.author ? text.author : ''}</p></div>`)
        myWindow.print()
        myWindow.close()
    }

    //Событие увеличения шрифта текста в задании
    const handleFontSizeInc = () => {
        const newSize = parseFloat(fontSize) + 0.1
        setFontSize(`${newSize}em`)
    }

    //Событие уменьшения шрифта текста в задании
    const handleFontSizeDec = () => {
        const newSize = parseFloat(fontSize) - 0.1
        setFontSize(`${newSize}em`)
    }

    return (
        <div className='analysis'>
            <div className='print__container'>
                <button className='print__button status__btn-point' onClick={handleFontSizeInc}><FontAwesomeIcon
                    icon={faPlus}/></button>
                <button className='print__button status__btn-point' onClick={handleFontSizeDec}><FontAwesomeIcon
                    icon={faMinus}/></button>
                <button className='print__button status__btn-point' onClick={handlePrint}><FontAwesomeIcon
                    icon={faPrint}/></button>
            </div>
            <div className="analysis__content">
                {/*Отображение заголовка текста, если он есть*/}
                {text.title ? <p className='analysis__title'>{text.title}</p> : null}

                {/*Если задание для чтения то отрисовываем специальный компонент Text
                Для письма просто отображаем полученный текст*/}
                {text.body ? props.type === 'reading' ? <Text fontSize={fontSize} text={text.body}/> :
                    <p className='analysis__text'>{text.body}</p> : null}

                {/*Отображение автора текста, если он есть*/}
                {text.author ? <p className='analysis__author'>{text.author}</p> : null}
            </div>

            {/*Для чтения отображаем панель с таймером и скоростью чтения, для письма не отображаем*/}
            {props.type === 'reading' ?
                <div className='analysis__panel'>
                    <Timer/>
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

//Компонент текста в чтении
function Text(props) {

    const [activeWord, setActiveWord] = useState(-1) //Номер активного слова
    const {text} = props
    const dispatch = useDispatch()
    let countOfDashes = 0 //количество тире

    const handleClick = (e) => {
        setActiveWord(e.target.dataset.index) //устанавливаем индекс слова на который кликнули
        dispatch(setSpeedReading(Number(e.target.dataset.count) + 1)) //записываем результат в стейт
    }

    return <p className='analysis__text'>
        {/*Массив из слов обёрнутых в span*/}
        {text.trim().split(" ").map((word, index) => {
                if (word === "-") {
                    countOfDashes++
                    return word
                }
                {/*Если встречаем в тексте знак | то переносим текст с новой строки и добавляем отсуп*/
                }
                return <React.Fragment key={index}>
                    {word[0] === "|" ? <br/> : null}
                    <span
                        key={index}
                        style={{fontSize: props.fontSize, marginLeft: word[0] === "|" ? "20px" : "0"}}
                        className={`analysis__word${index === Number(activeWord) ? " active-word" : ''}`}
                        data-index={index}
                        data-count={index - countOfDashes}
                        onClick={handleClick}>{word[0] === "|" ? word.slice(1) : word}</span>
                </React.Fragment>
            }
        )}
    </p>
}

Text.propTypes = {
    fontSize: PropTypes.string
}

Analysis.propTypes = {
    texts: PropTypes.array,
    type: PropTypes.string
}