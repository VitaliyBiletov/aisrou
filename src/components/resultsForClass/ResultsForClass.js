import React, {useState, useEffect} from 'react';
import Select from 'react-select'
import {getResults} from "../../http/diagnosticAPI";
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";
import {TailSpin} from 'react-loader-spinner'
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const [isLoading, setIsLoading] = useState(false)
    const [isShowLoader, setIsShowLoader] = useState(false)

    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }

    const handleChangeClass = (e) => {
        setClassNumber(e.target.value)
    }

    const notify = (type, text) => {
        const options = {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
        switch (type) {
            case "success":
                toast.success(text, options)
                break
            case "error":
                toast.error(text, options)
                break
            default:
                toast.info('Неизвестная ошибка', options)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setIsShowLoader(true)
        try {
            const result = await getResults(year, classNumber)
            console.log(result)
            setData(result.data)
            setIsLoading(true)
            setIsShowLoader(false)
        } catch (e) {
            notify("error", e.message)
        }

    }

    return <div className="admin-section resultsForClass">
        {/* Same as */}
        <ToastContainer/>
        <h2 className="admin-section__title">Результаты</h2>
        <div className="admin-section__container">
            <form className="resultsForClass__form" action="">
                <label className='resultsForClass__input'>
                    Класс
                    <select
                        placeholder="Выберите год"
                        onChange={handleChangeClass}
                        value={classNumber}
                    >
                        {options.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
                    </select>
                </label>
                <label className='resultsForClass__input'>
                    Год
                    <input type="number" value={year} onChange={handleChangeYear}/>
                </label>
                <button className='admin-section__button' onClick={handleClick}>Показать</button>
            </form>
            {isLoading ?
                <div>
                    {data.hasOwnProperty('results') && data.results.length !== 0 ?
                        <div>
                            <div>
                                <span>Логопеды:</span>
                                <ol>
                                    {data.listTeachers.map((teacher, index) => <li key={index}>{teacher.name}</li>)}
                                </ol>
                            </div>
                            <div>
                                <span>Список учеников: </span>
                                <ol>
                                    {data.listStudents.map((student, index) => <li key={index}>{student.name}</li>)}
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
                </div> :
                isShowLoader ?
                    <TailSpin
                        height="50"
                        width="50"
                        color='#4e4583'
                    /> : null}
        </div>
    </div>
}