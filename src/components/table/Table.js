import React, {useState, useEffect} from 'react'
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

  const navigate = useNavigate()

  useEffect(()=>{
    console.log(props.data)
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

  console.log('data',props.fields)

  if (props.data.length !== 0){
    return (
      <div className='table'>
        <div className='table__container'>
          <table className='table__table'>
            <thead className='table__thead thead'>
            <tr className='thead__tr'>
              {props.fields.map(({name, title})=>
                <th key={name} className='thead__th'>{title}</th>
              )}
              {Object.values(props.functions).filter((val) => val).map((val, index)=>
                <th key={index} className='thead__th'/>
              )}
            </tr>
            </thead>
            <tbody className='table__tbody tbody'>
            {props.data.sort((a,b)=>a.id > b.id ? 1 : -1 ).map((item)=>
              <tr
                key={item.id}
                data-value={item.id}
                onClick={()=>setActiveItem(item.id)}
                className={`${activeItem === item.id ? 'tbody__tr_active' : null} tbody__tr`}
              >
                {item.fieldsData.map((f)=>{
                    return <td key={f.name} className='tbody__td'>{
                      String(f.name) === 'progress' ?
                      <Line
                        key={f.name}
                        percent={f.value}
                        trailWidth="20"
                        strokeWidth="20"
                        strokeColor="#009d23"
                        trailColor="#e0ffe1"
                        strokeLinecap="square"
                        className="progress__line_main"
                      /> : f.value}
                      </td>
                }

                )}
                {isFill ?
                  <td className={`tbody__td tbody__td_func`}>
                    <button
                      title='Заполнить'
                      onClick={()=>navigate(DIAGNOSTIC_ROUTE)}
                      className='tbody__button tbody__button_type_fill'>
                      <FontAwesomeIcon icon={faListAlt} />
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
              activeItem={props.activeItem}
              close={closeModalRemove}
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