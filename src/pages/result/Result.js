import React, { useState, useEffect, PureComponent } from 'react';
import {Header} from "../../components/header/Header";
import {DIAGNOSTIC_MENU_ROUTE, DIAGNOSTIC_ROUTE} from "../../utils/const";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {getResult} from "../../http/diagnosticAPI"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  BarChart,
  LabelList
} from 'recharts';

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  return (
      <g>
        <text style={{textShadow: "2px 2px #c7e3ff"}} x={width + x + 30} y={y + 25} fill="#1e90ff" textAnchor="middle" dominantBaseline="middle">
          {value}%
        </text>
      </g>
    )

};

const stateOfFuncNames = {
  hearing: "Слух",
  vision: "Зрение",
  breath: "Дыхание",
  voice: "Голос",
  prosody: "Просодика",
  articulationApparatus: "Артикулляционный аппарат",
  motorSkills: "Моторика",
  additionalInformation: "Дополнительная информация"
}

const sectionsNames = {
  artic: "Артикуляционная моторика",
  phonemics: "Фонематическое восприятие",
  sounds: "Звукопроизношение",
  syllable: "Звуко-слоговая структура"
}

const diagSections = {
  grammatic: "Грамматика",
  lexis: "Лексика",
  coherentSpeech: "Связная речь",
  langAnalysis: "Языковой анализ"
}

export default function Result(props) {
  const navigate = useNavigate()
  // const diagInfo = useSelector(state=>state.diagnostic.info.data)
  const diagInfo = JSON.parse(sessionStorage.getItem("diagInfo"))
  const [data, setData] = useState({})
  const [diagramData, setDiagramData] = useState([])
  const state = useSelector(state=>state.diagnostic.tasks)

  useEffect(()=>{
    const stateOfFunc = state.stateOfFunc
    console.log(stateOfFunc)
    const sensMotorResult = Object.keys(state.sensMotor).map(section=>{
      const result = calcResult(state.sensMotor[section])
      return {name: sectionsNames[section], "Результат": result}
    })

    const otherResult = Object.keys(diagSections).map(section=>{
      return {name: diagSections[section], "Результат": calcSectionResult(state[section])}
    })

    setDiagramData(_.union(sensMotorResult, otherResult))
  },[state.sensMotor.artic])

  return(
    <div className="result">
      <div className="result__container">
        <h2>Результаты</h2>
        {state.stateOfFunc ?
          <div className="result__stateOfFunc">
            {Object.keys(state.stateOfFunc)
              .map((key, index)=>{
                const value = state.stateOfFunc[key]
                return <p key={index}>{stateOfFuncNames[key]} : {value ? value : <span style={{"color": "gray"}}>Не заполнено</span>}</p>
              }
              )}
          </div>
        : null }
        {diagramData ?
        <div className="result__diagram" >
          <BarChart barCategoryGap={5} layout="vertical" width={800} height={500} data={diagramData}
                     margin={{ top: 5, right: 60, left: 110, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]}/>
            <YAxis
              dataKey="name"
              interval={0}
              type="category"
            />
            <Tooltip />
            {/*<Legend />*/}
            {/*<Line type="monotone" dataKey="pv" stroke="#8884d8" />*/}
            <Bar background={{ fill: '#dff1e6' }} minPointSize={5} type="monotone" dataKey="Результат" fill="#4cb373" >
              <LabelList dataKey="Результат" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </div> : null }
        </div>
      <div className='diagnostic__bottom-section'>
        <button
          className='diagnostic__btn diagnostic__btn_cancel'
          onClick={() => {
            sessionStorage.removeItem('activeTab')
            navigate(DIAGNOSTIC_MENU_ROUTE)
          }}
        >Меню
        </button>
        <button
          className='diagnostic__btn diagnostic__btn_cancel'
          onClick={() => {
            sessionStorage.removeItem('activeTab')
            navigate(DIAGNOSTIC_ROUTE)
          }}
        >Назад
        </button>
      </div>
    </div>
  )
}

function calcResult(data){
  if (data.length === 0){
    return 0
  }
  const tmp = data.reduce((sum, current)=>{
    return sum + current.value
  }, 0)
  const result = Number((tmp / (data.length * 3)) * 100).toFixed(2)
  return parseFloat(result)
}

  function calcSectionResult(list){
  const subsections = Object.keys(list).map(item=>{
    return calcResult(list[item])
  }).reduce((sum, current)=>{
        return sum + current
      }, 0)

  return parseFloat((subsections / Object.keys(list).length).toFixed(2))
  // const sections = await Promise.all(Object.keys(list).map(async function(item){
  //   const result = list[item].map(item=>{
  //     return calcResult(item)
  //   }).reduce((sum, current)=>{
  //     return sum + current
  //   }, 0)
  // return {result}
  // }))
  // console.log(sections)
  // return {}
}