import React, {useState, useEffect} from 'react';
import {DIAGNOSTIC_MENU_ROUTE, DIAGNOSTIC_ROUTE} from "../../utils/const";
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import translateTitle from "./translatedTitles"


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
  const {x, y, width, value} = props;
  return (
    <g>
      <text style={{textShadow: "2px 2px #c7e3ff"}} x={width + x + 30} y={y + 25} fill="#1e90ff" textAnchor="middle"
            dominantBaseline="middle">
        {value}%
      </text>
    </g>
  )

};

export default function Result(props) {
  const navigate = useNavigate()
  const [diagramData, setDiagramData] = useState([])
  const [readingResult, setReadingResult] = useState([])
  const state = useSelector(state => state.diagnostic.tasks)

  useEffect(() => {

    const sensMotorResult = Object.keys(state.sensMotor).map(section => {
      const result = calcResult(state.sensMotor[section])
      return {name: translateTitle.sensMotor[section], "Результат": result}
    })

    const otherResult = Object.keys(translateTitle.otherSections).map(section => {
      return {name: translateTitle.otherSections[section], "Результат": calcSectionResult(state[section])}
    })

    const readingResult = state.reading.skills
    setReadingResult(Object.entries(readingResult).filter(res=>res[1]))


    setDiagramData(_.union(sensMotorResult, otherResult))
  }, [state.sensMotor.artic])

  return (
    <div className="result">
      <div className="result__container">
        <h2 className="result__header">Результаты</h2>
        {state.stateOfFunc ?
          <div className="result__stateOfFunc">
            {Object.keys(state.stateOfFunc)
              .map((key, index) => {
                  const value = state.stateOfFunc[key]
                return <p key={index}><b>{translateTitle.stateOfFunc[key]}</b> : {value ? value :
                    <span style={{"color": "gray"}}>Не заполнено</span>}</p>
                }
              )}
          </div>
          : null}
        {diagramData ?
          <div className="result__diagram">
            <BarChart barCategoryGap={5} layout="vertical" width={800} height={500} data={diagramData}
                      margin={{top: 5, right: 60, left: 110, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis type="number" domain={[0, 100]}/>
              <YAxis
                dataKey="name"
                interval={0}
                type="category"
              />
              <Tooltip/>
              <Bar background={{fill: '#dff1e6'}} minPointSize={5} type="monotone" dataKey="Результат" fill="#4cb373">
                <LabelList dataKey="Результат" content={renderCustomizedLabel}/>
              </Bar>
            </BarChart>
          </div> : null}
          <div>
            <p><b>Скорость чтения</b> {state.reading.speed} сл/мин</p>
            {Object.keys(translateTitle.reading).map((key, index)=>{
              return (
                <div key={index}>
                  <p>{translateTitle.reading[key].title}</p>
                  <ul>
                    {Object.keys(translateTitle.reading[key].data).map((name, index)=>{
                      return state.reading.skills[key][name] ? <li key={index}>{translateTitle.reading[key].data[name]}</li> : null
                    })}
                  </ul>
                </div>
                )
            })}
          </div>
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

function calcResult(data) {
  if (data.length === 0) {
    return 0
  }
  const tmp = data.reduce((sum, current) => {
    return sum + current.value
  }, 0)
  const result = Number((tmp / (data.length * 3)) * 100).toFixed(2)
  return parseFloat(result)
}

function calcSectionResult(list) {
  const subsections = Object.keys(list).map(item => {
    return calcResult(list[item])
  }).reduce((sum, current) => {
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