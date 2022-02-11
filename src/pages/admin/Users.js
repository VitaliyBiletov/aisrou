import React, {useState, useRef} from 'react'
import Table from '../../components/table/Table'
import {UserRegistration} from '../../components/userRegistration/UserRegistration'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyle={
  content: {
    position: 'relative',
    width: '600px',
    margin: "0 auto",
    borderRadius: "20px"
  }

}

function Users() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  return (
    <div>
      <div>
        <button onClick={openModal}>Зарегистрировать</button>
        <button>Сменить пароль</button>
        <button>Удалить</button>
      </div>
      <Table />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
      >
        <UserRegistration close={closeModal}/>
      </Modal>
    </div>

  )
}

export {Users}