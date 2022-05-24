import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import {getResults} from "../../http/diagnosticAPI";
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";

const options = [
    {value: 0, label: '1д'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
]

const renderCustomizedLabel = (props) => {
    const {x, y, width, value} = props;
    return (
        <g>
            <text style={{textShadow: "2px 2px #c7e3ff"}} x={width + x + 30} y={y + 20} fill="#1e90ff"
                  textAnchor="middle"
                  dominantBaseline="middle">
                {value}%
            </text>
        </g>
    )
};

export default function ResultsForClass(props) {

    const [year, setYear] = useState(2020)
    const [classNumber, setClassNumber] = useState(0)
    const [data, setData] = useState({})

    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }

    const handleChangeClass = (e) => {
        setClassNumber(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        getResults(year, classNumber).then(({data}) => setData(data))
    }

    console.log(data)

    return <div>
        <h2 className="title">Результаты</h2>
        <form action="">
            <label className='groups__label'>
                Класс
                <select
                    placeholder="Выберите год"
                    onChange={handleChangeClass}
                    value={classNumber}
                >
                    {options.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
                </select>
            </label>
            <label className='groups__label'>
                Год
                <input type="number" value={year} onChange={handleChangeYear}/>
            </label>
            <button className='groups__button' onClick={handleClick}>Показать</button>
        </form>
        <div>
            {data.hasOwnProperty('results') && data.results.length !== 0 ?
                <div>
                    <div>
                        <span>Список учеников: </span>
                        <ol>
                            {data.listStudents.map((student, index) => <li key={index}>{student.name} ({student.count})</li>)}
                        </ol>
                    </div>

                    <BarChart barCategoryGap={5} layout="vertical" width={800} height={800}
                              data={data.results}
                              margin={{top: 5, right: 60, left: 110, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number" domain={[0, 100]}/>
                        <YAxis
                            dataKey="name"
                            interval={0}
                            type="category"
                        />
                        <Bar background={{fill: '#dff1e6'}} minPointSize={5} type="monotone" dataKey="uv"
                             fill="#4cb373">
                            <LabelList dataKey="uv" content={renderCustomizedLabel}/>
                        </Bar>
                        <Bar background={{fill: '#ffeae0'}} minPointSize={5} type="monotone" dataKey="pv"
                             fill="#ff7f50">
                            <LabelList dataKey="pv" content={renderCustomizedLabel}/>
                        </Bar>
                    </BarChart>
                </div>
                : null}
        </div>
    </div>
}