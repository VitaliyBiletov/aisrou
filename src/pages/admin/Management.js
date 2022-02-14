import React, {useState ,useEffect} from 'react'
import Table from "../../components/table/Table";
import Modal from 'react-modal'
import {getAll} from "../../http/managementAPI";
import './management.sass'
import {RegistrationUserForm} from "../../components/forms/RegistrationUserForm";
import {RegistrationStudentForm} from "../../components/forms/RegistrationStudentForm";
import {EditUserForm} from "../../components/forms/EditUserForm";
import {EditStudentForm} from "../../components/forms/EditStudentForm";
import {SetPasswordForm} from "../../components/forms/SetPasswordForm";
import {RemoveForm} from "../../components/forms/RemoveForm";
import {EditForm} from "../../components/forms/EditForm";

const customStyle={
  content: {
    position: 'relative',
    width: '600px',
    margin: "0 auto",
    borderRadius: "20px"
  }
}

Modal.setAppElement('#root')

function Management(props){
  const [data, setData] = useState({})
  const [activeItem, setActiveItem] = useState(null)
  const [modalRegistrationIsOpen, setModalRegistrationIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalSetPasswordIsOpen, setModalSetPasswordIsOpen] = useState(false)
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('')

  useEffect(async()=>{
    if (type !== props.type){
      setType(props.type)
      const list = await getAll(props.type)
      setIsLoading(true)
      setData(list)
    }
  })

  async function updateData() {
    setIsLoading(false)
    const list = await getAll(props.type)
    setData(list)
    setIsLoading(true)
  }

  function openModalRegistration() {
    setModalRegistrationIsOpen(true)
  }

  function closeModalRegistration() {
    setModalRegistrationIsOpen(false)
  }

  function openModalEdit() {
    setModalEditIsOpen(true)
  }

  function closeModalEdit() {
    setModalEditIsOpen(false)
  }

  function openModalSetPassword() {
    setModalSetPasswordIsOpen(true)
  }

  function closeModalPassword() {
    setModalSetPasswordIsOpen(false)
  }

  async function openModalRemove(){
    setModalRemoveIsOpen(true)
  }

  function closeModalRemove() {
    setModalRemoveIsOpen(false)
  }

  return (
    <div className='management'>
      <h2 className='management__title'>{props.title}</h2>
      <div className='management__buttons'>
        <button className='management__button' onClick={openModalRegistration}>Зарегистрировать</button>
        <button className='management__button' onClick={activeItem && openModalEdit}>Изменить</button>
        {props.type === 'user' ? <button className='management__button' onClick={openModalSetPassword}>Сменить пароль</button> : null }
        <button className='management__button' onClick={activeItem && openModalRemove}>Удалить</button>
      </div>
      {isLoading ?
        <div className='management__table'>
          <Table
            data={data}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div> : <p>Загрузка</p>
      }
      <Modal isOpen={modalRegistrationIsOpen} onRequestClose={closeModalRegistration} style={customStyle}>
        {props.type === 'user' ? <RegistrationUserForm /> : null}
        {props.type === 'student' ? <RegistrationStudentForm /> : null}
      </Modal>
      <Modal isOpen={modalEditIsOpen} onRequestClose={closeModalEdit} style={customStyle}>
        <EditForm
          type={type}
          activeItem={activeItem}
        />
      </Modal>
      <Modal isOpen={modalSetPasswordIsOpen} onRequestClose={closeModalPassword} style={customStyle}>
        <SetPasswordForm
          activeItem={activeItem}
          close={closeModalPassword}
        />
      </Modal>
      <Modal isOpen={modalRemoveIsOpen} onRequestClose={closeModalRemove} style={customStyle}>
        <RemoveForm
          setActiveItem={setActiveItem}
          close={closeModalRemove}
          type={type}
          activeItem={activeItem}
          updateData={updateData}
        />
      </Modal>
    </div>
  )
}

export {Management}