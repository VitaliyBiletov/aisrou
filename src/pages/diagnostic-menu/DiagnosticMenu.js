import React, {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Header from "../../components/header/Header"
import {getListGroups} from "../../http/groupAPI"
import {getDiagnostics, createDiagnostic} from "../../http/diagnosticAPI"
import Table from "../../components/table/Table"
import Select from 'react-select'
import Modal from 'react-modal'
import {useNavigate} from 'react-router-dom'
import {DYNAMIC_ROUTE} from "../../utils/const";
import {setStudent} from "../../redux/actions/infoActions";
import {faChartLine} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

const typesWords = ["Первичная", "Вторичная"]

const customStyleModal = {
    content: {
        position: 'relative',
        width: '600px',
        margin: "0 auto",
        borderRadius: "20px"
    }
}

const customStyles = {
    menu: (provided) => ({
        ...provided,
        color: '#4e4583',
    }),

    option: () => ({
        padding: 5,
        '&:hover': {
            color: '#fff',
            cursor: 'pointer',
            backgroundColor: '#6a5fab'
        }
    }),

    singleValue: (provided) => {
        const color = '#4e4583';
        return {...provided, color};
    }
}

export default function DiagnosticMenu() {
    const {id, fullName} = useSelector(state => state.user)
    const {tasks} = useSelector(state => state.diagnostic)
    const [students, setStudents] = useState([])
    const [fields, setFields] = useState(null)
    const [data, setData] = useState(null)
    const [diagInfo, setDiagInfo] = useState({})
    const [activeStudentId, setActiveStudentId] = useState(null)
    const [modalCreateDiagIsOpen, setModalCreateDiagIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formRef = useRef()

    useEffect(() => {
        if (id) {
            getListGroups(id).then(students => {
                setStudents(students)
                setIsLoading(true)
            })
        }
    }, [])

    function openModalCreateDiag() {
        setModalCreateDiagIsOpen(true)
    }

    function closeModalCreateDiag() {
        setModalCreateDiagIsOpen(false)
    }

    const handleChangeStudent = (e) => {
        dispatch(setStudent({id: e.value, label: e.label}))
        sessionStorage.setItem("student", JSON.stringify({id: e.value, label: e.label}))
        setActiveStudentId(e.value)
        getDiagnostics(e.value).then(diags => {
            const data = diags.data.map(item => {
                item["Тип"] = typesWords[item["Тип"]]
                return item
            })
            setFields(diags.fields)
            setData(data)
        }).catch(e => console.log(e))
    }

    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setDiagInfo({...diagInfo, [name]: value})
    }

    const handleCreate = (e) => {
        e.preventDefault()
        const {type, classNumber, date} = diagInfo
        createDiagnostic(id, activeStudentId, date, type, classNumber, tasks).then((result) => {
            result.data.type = typesWords[result.data.type]
            setData([...data, result.data])
            setModalCreateDiagIsOpen(false)
        })
    }

    return (
        <div className='diagnostic-menu'>
            <Header username={fullName}/>
            {isLoading ?
                <div className='diagnostic-menu__container'>
                    <h1 className='diagnostic-menu__h1'>Выберите ученика</h1>
                    <div className='diagnostic-menu__select'>
                        <Select
                            placeholder="Выберите ученика"
                            styles={customStyles}
                            onChange={handleChangeStudent}
                            options={students.map(s =>
                                ({value: s.id, label: s.lastName + " " + s.firstName})
                            )}/>
                    </div>
                    {activeStudentId ?
                        <div className='diagnostic-menu__list'>
                            <h3 className='diagnostic-menu__h3'>
                                Обследования
                                <button
                                    className='diagnostic-menu__button diagnostic-menu__button_type_add'
                                    onClick={openModalCreateDiag}
                                    title='Добавить'
                                >+</button>
                                <button
                                    className='diagnostic-menu__button diagnostic-menu__button_type_compare'
                                    onClick={() => navigate(DYNAMIC_ROUTE)}
                                    title='Динамика'
                                >
                                    <FontAwesomeIcon className="tbody__icon" icon={faChartLine}/>
                                </button>
                            </h3>
                            <div className="diagnostic-menu__table">
                                {data ?
                                    <Table
                                        type='diagnostics'
                                        functions={{isRemove: true, isFill: true, isEdit: true}}
                                        fields={fields}
                                        data={data}
                                        setData={setData}
                                    /> : null}
                            </div>
                        </div> : null}
                </div> : null}
            <Modal isOpen={modalCreateDiagIsOpen} onRequestClose={closeModalCreateDiag} style={customStyleModal}>
                <div className='modal'>
                    <h2 className='modal__title'>Создание диагностики</h2>
                    <div className='modal__container'>
                        <form ref={formRef} className='modal__form form'>
                            <label>
                                Дата обследования
                                <input
                                    name="date"
                                    className='form__input'
                                    type="date"
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Тип
                                <select
                                    name="type"
                                    className='form__input'
                                    size={2}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="0">Первичная</option>
                                    <option value="1">Вторичная</option>
                                </select>
                            </label>
                            <label>
                                Класс (0-5)
                                <input
                                    name="classNumber"
                                    className='form__input'
                                    id="diagClassNumber"
                                    type="number"
                                    onChange={handleChange}
                                    max="5"
                                    min="0"
                                    required
                                />
                            </label>
                            <button onClick={handleCreate} className='form__button'>Создать</button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}