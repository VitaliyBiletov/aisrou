import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {DIAGNOSTIC_MENU_ROUTE} from "../../utils/const";
import {Header} from "../../components/header/Header";
import Select from 'react-select'
import {compare} from '../../http/diagnosticAPI'
import {useSelector, useDispatch} from 'react-redux'
import {getDiagnosticsList} from '../../http/diagnosticAPI'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  BarChart,
  LabelList
} from 'recharts';
import {Footer} from "../../components/footer/Footer";

const renderCustomizedLabel = (props) => {
  const {x, y, width, value} = props;
  return (
    <g>
      <text style={{textShadow: "2px 2px #c7e3ff"}} x={width + x + 30} y={y + 20} fill="#1e90ff" textAnchor="middle"
            dominantBaseline="middle">
        {value}%
      </text>
    </g>
  )
};

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    color: '#4e4583',
  }),

  option: (provided, state) => ({
    padding: 5,
    '&:hover': {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: '#6a5fab'
    }
  }),

  singleValue: (provided, state) => {
    const color = '#4e4583';
    return {...provided, color};
  }
}

export default function Dynamic(props) {
  const [data, setData] = useState({})
  const [listDignostics, setListDiagnosttics] = useState([])
  const [diagnosticId1, setDiagnosticId1] = useState()
  const [diagnosticId2, setDiagnosticId2] = useState()
  const navigate = useNavigate()
  const state = useSelector(state => state.diagnostic.info)

  useEffect(() => {
    const studentId = JSON.parse(sessionStorage.getItem("student")).id
    getDiagnosticsList(studentId).then(list => {
      setListDiagnosttics(list)
    })

  }, [])

  const handleCompare = async (e) => {
    const results = await compare(diagnosticId1, diagnosticId2)
    setData(results.data)
  }

  const handleChangeDiagnosticId1 = (e) => {
    setDiagnosticId1(e.value)
  }

  const handleChangeDiagnosticId2 = (e) => {
    setDiagnosticId2(e.value)
  }

  return <div className="dynamic">
    <Header/>
    <h2 className="result__header">Динамика</h2>
    <div className="dynamic__container">
      <div className="dynamic__column">
        <Select
          placeholder="Выберите диагностику"
          styles={customStyles}
          options={listDignostics}
          onChange={handleChangeDiagnosticId1}
        />
      </div>
      <button className="dynamic__button-compare" onClick={handleCompare}>Сравнить</button>
      <div className="dynamic__column">
        <Select
          placeholder="Выберите диагностику"
          styles={customStyles}
          options={listDignostics}
          onChange={handleChangeDiagnosticId2}
        />
      </div>
    </div>
    {Object.keys(data).length !== 0 ?
      <div className="dynamic-data">
        <div className="dynamic-data__container">
          <div className="dynamic-data__stateOfFunc">
            {data.stateOfFunc.data.map((item, index) => {
              return <div key={index} className={`dynamic-data__column dynamic-data__column_num_${index}`}>
                {Object.entries(item).map(([key, value], index) => <p key={index}><b>{key}</b>: {value}</p>)}
              </div>
            })}
          </div>
          <div className="dynamic__diagramm">
            <BarChart barCategoryGap={5} layout="vertical" width={800} height={800} data={data.sectionsResults}
                      margin={{top: 5, right: 60, left: 110, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis type="number" domain={[0, 100]}/>
              <YAxis
                dataKey="name"
                interval={0}
                type="category"
              />
              <Bar background={{fill: '#dff1e6'}} minPointSize={5} type="monotone" dataKey="uv" fill="#4cb373">
                <LabelList dataKey="uv" content={renderCustomizedLabel}/>
              </Bar>
              <Bar background={{fill: '#ffeae0'}} minPointSize={5} type="monotone" dataKey="pv" fill="#ff7f50">
                <LabelList dataKey="pv" content={renderCustomizedLabel}/>
              </Bar>
            </BarChart>
          </div>
        </div>
      </div> : null}
      <Footer>
        <button
          className='diagnostic__btn diagnostic__btn_cancel'
          onClick={() => navigate(DIAGNOSTIC_MENU_ROUTE)
                }>Назад</button>
      </Footer>
  </div>
}