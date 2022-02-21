import React, {useState, useEffect} from 'react'
import Table from "../../components/table/Table";
import Modal from 'react-modal'
import {getAll} from "../../http/userAPI";
import {RegistrationForm} from "../../components/forms/RegistrationForm";
import {SetPasswordForm} from "../../components/forms/SetPasswordForm";
import {RemoveForm} from "../../components/forms/RemoveForm";
import {EditForm} from "../../components/forms/EditForm";
import './management.sass'


const customStyle = {
  content: {
    position: 'relative',
    width: '600px',
    margin: "0 auto",
    borderRadius: "20px"
  }
}

Modal.setAppElement('#root')

function Management(props) {
  const [activeItem, setActiveItem] = useState(null)
  const [modalRegistrationIsOpen, setModalRegistrationIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalSetPasswordIsOpen, setModalSetPasswordIsOpen] = useState(false)
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false)

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

  async function openModalRemove() {
    setModalRemoveIsOpen(true)
  }

  function closeModalRemove() {
    setModalRemoveIsOpen(false)
  }

  return (
    <div className='management'>
      <h2 className='management__title title'>{props.title}</h2>
      <div className='management__buttons'>
        <button className='management__button' onClick={openModalRegistration}>Зарегистрировать</button>
      </div>
      <div className='management__table'>
        <Table
          data={props.data}
          type={props.type}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          handleResetPassword={openModalSetPassword}
          handleEdit={openModalEdit}
          handleRemove={openModalRemove}
        />
      </div>
      {modalRegistrationIsOpen ?
        <Modal isOpen={modalRegistrationIsOpen} onRequestClose={closeModalRegistration} style={customStyle}>
          <RegistrationForm
            type={props.type}
            updateData={props.update}
            close={closeModalRegistration}
          />
        </Modal> : null
      }
      {modalEditIsOpen ?
        <Modal isOpen={modalEditIsOpen} onRequestClose={closeModalEdit} style={customStyle}>
          <EditForm
            type={props.type}
            activeItem={activeItem}
            updateData={props.update}
            close={closeModalEdit}
          />
        </Modal> : null
      }
      {modalSetPasswordIsOpen ?
        <Modal isOpen={modalSetPasswordIsOpen} onRequestClose={closeModalPassword} style={customStyle}>
          <SetPasswordForm
            activeItem={activeItem}
            close={closeModalPassword}
          />
        </Modal> : null
      }
      {modalRemoveIsOpen ?
        <Modal isOpen={modalRemoveIsOpen} onRequestClose={closeModalRemove} style={customStyle}>
          <RemoveForm
            type={props.type}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            updateData={props.update}
            close={closeModalRemove}
          />
        </Modal> : null
      }
    </div>
  )
}

export {Management}