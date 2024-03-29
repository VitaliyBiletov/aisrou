import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {faTrash, faKey, faPen, faListAlt} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import {useNavigate} from 'react-router-dom'
import {EditForm} from "../../components/forms/EditForm";
import {RemoveForm} from "../../components/forms/RemoveForm";
import {SetPasswordForm} from "../forms/SetPasswordForm";
import { Line } from 'rc-progress'


import {DIAGNOSTIC_ROUTE} from "../../utils/const";
import {setInfoData} from "../../redux/actions/infoActions";
import {getDiagnostic} from "../../http/diagnosticAPI";


const customStyle = {
  content: {
    position: 'relative',
    width: '600px',
    margin: "0 auto",
    borderRadius: "20px"
  }
}

function Table(props) {
  const [activeItem, setActiveItem] = useState(null)
  const {isEdit, isResetPassword, isFill, isRemove} = props.functions
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false)
  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false)
  const info = useSelector(state=>state.diagnostic.info)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(()=>{

  },[])

  function openModalEdit() {
    setModalEditIsOpen(true)
  }

  function closeModalEdit() {
    setModalEditIsOpen(false)
  }

  function openModalRemove() {
    setModalRemoveIsOpen(true)
  }

  function closeModalRemove() {
    setModalRemoveIsOpen(false)
  }

  function openModalSetPassword() {
    setModalPasswordIsOpen(true)
  }

  function closeModalSetPassword() {
    setModalPasswordIsOpen(false)
  }

  async function handleFillClick(e) {
    const diagId = Number(e.target.value)
    try {
      const res = await getDiagnostic(diagId)
      dispatch(setInfoData(res.data))
      sessionStorage.setItem("diagInfo", JSON.stringify(res.data))
      navigate(DIAGNOSTIC_ROUTE)
    } catch (e) {
      console.log('error: ', e.response.data.error)
    }



    // const activeDiag = props.data.find(({id})=>id===diagId)
    // dispatch(setInfoData([{name: 'id', value: diagId, title:'id'}, ...activeDiag.fieldsData]))
    // const classNumber = activeDiag.fieldsData.find(({name})=>name === 'classNumber').value
    // const type = activeDiag.fieldsData.find(({name})=>name === 'type').value
    // sessionStorage.setItem("diagId", diagId)
    // sessionStorage.setItem("student", JSON.stringify(info.student))
    // sessionStorage.setItem("classNumber", classNumber)
    // sessionStorage.setItem("type", type)
    // navigate(DIAGNOSTIC_ROUTE)
  }

  if (props.data.length !== 0){
    return (
      <div className='table'>
        <div className='table__container'>
          <table className='table__table'>
            <thead className='table__thead thead'>
            <tr className='thead__tr'>
              {props.fields.map((name, index)=>
                <th key={index} className='thead__th'>{name}</th>
              )}
              {Object.values(props.functions).filter((val) => val).map((val, index)=>
                <th key={index} className='thead__th'/>
              )}
            </tr>
            </thead>
            <tbody className='table__tbody tbody'>
            {props.data.map((item)=>
              <tr
                key={item.id}
                data-value={item.id}
                onClick={()=>setActiveItem(item.id)}
                className={`${activeItem === item.id ? 'tbody__tr_active' : null} tbody__tr`}
              >
                {Object.keys(item).map((f, index)=>{
                    return <td data-value={item[f]} key={index} className='tbody__td'>{
                      String(f) === 'Прогресс' ?
                      <Line
                        percent={item[f]}
                        trailWidth="20"
                        strokeWidth="20"
                        strokeColor="#009d23"
                        trailColor="#e0ffe1"
                        strokeLinecap="square"
                        className="progress__menu"
                      /> : item[f]}
                      </td>
                }

                )}
                {isFill ?
                  <td className={`tbody__td tbody__td_func`}>
                    <button
                      title='Заполнить'
                      onClick={handleFillClick}
                      value={item.id}
                      className='tbody__button tbody__button_type_fill'>
                      <FontAwesomeIcon className="tbody__icon" icon={faListAlt} />
                    </button>
                  </td> : null }
                {isEdit ?
                  <td className={`tbody__td tbody__td_func`}>
                    <button
                      title='Редактировать'
                      onClick={openModalEdit}
                      className='tbody__button tbody__button_type_edit'>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td> : null}
                {isResetPassword ?
                  <td className={`tbody__td tbody__td_func`}>
                    <button
                      title='Сбросить пароль'
                      onClick={openModalSetPassword}
                      className='tbody__button tbody__button_type_reset-password'>
                      <FontAwesomeIcon icon={faKey} />
                    </button>
                  </td> : null}
                {isRemove ?
                  <td className={`tbody__td tbody__td_func`}>
                    <button
                      title='Удалить'
                      onClick={openModalRemove}
                      className='tbody__button tbody__button_type_remove'>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td> : null}
              </tr>
            )}
            </tbody>
          </table>
        </div>

        {modalEditIsOpen ?
          <Modal isOpen={modalEditIsOpen} onRequestClose={closeModalEdit} style={customStyle}>
            <EditForm
              type={props.type}
              data={props.data}
              setData={props.setData}
              activeItem={activeItem}
              close={closeModalEdit}
            />
          </Modal> : null
        }

        {modalRemoveIsOpen ?
          <Modal isOpen={modalRemoveIsOpen} onRequestClose={closeModalRemove} style={customStyle}>
            <RemoveForm
              type={props.type}
              data={props.data}
              setData={props.setData}
              activeItem={activeItem}
              close={closeModalRemove}
            />
          </Modal> : null
        }

        {modalPasswordIsOpen ?
          <Modal isOpen={modalPasswordIsOpen} onRequestClose={closeModalSetPassword} style={customStyle}>
            <SetPasswordForm
              type={props.type}
              setData={props.setData}
              activeItem={activeItem}
              close={closeModalSetPassword}
            />
          </Modal> : null
        }
      </div>
    )
  } else {
    return null
  }
}

Table.propTypes = {
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
  data: PropTypes.array,
  fields: PropTypes.array,
  handleRemove: PropTypes.func,
  handleResetPassword: PropTypes.func,
}

export default Table