import React, {useState, useEffect} from 'react'
import Table from '../../components/table/Table'
import {RegistrationForm} from '../../components/forms/RegistrationForm'
import {EditForm} from '../../components/forms/EditForm'
import Modal from 'react-modal'
import './users.sass'
import {getAll, get} from '../../http/userAPI'

Modal.setAppElement('#root')

const customStyle={
  content: {
    position: 'relative',
    width: '600px',
    margin: "0 auto",
    borderRadius: "20px"
  }
}

const USER_EDIT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
]

const USER_INPUT_DATA = [
  {name: 'firstName', type: 'text', placeholder: 'Имя'},
  {name: 'lastName', type: 'text', placeholder: 'Фамилия'},
  {name: 'patronymic', type: 'text', placeholder: 'Отчество'},
  {name: 'email', type: 'text', placeholder: 'Email'},
  {name: 'password', type: 'password', placeholder: 'Пароль'},
  {name: 'password2', type: 'password', placeholder: 'Повторите пароль'},
]

function Users() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [activeUser, setActiveUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(async ()=>{
    await updateList()
  }, [])

  async function updateList() {
    const users = await getAll()
    setUsers(users)
  }

  function openModal() {
    setModalIsOpen(true)
  }

  function openModalEdit() {
    if (activeUser){
      setModalEditIsOpen(true)
    }
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  async function closeModalEdit() {
    console.log('close')
    setModalEditIsOpen(false)
    await updateList()
  }

  return (
    <div className='users'>
      <h2 className='users__title'>Пользователи</h2>
      <div className='users__buttons'>
        <button className='users__button' onClick={openModal}>Зарегистрировать</button>
        <button className='users__button' onClick={openModalEdit}>Изменить</button>
        <button className='users__button'>Сменить пароль</button>
        <button className='users__button'>Удалить</button>
      </div>
      <Table users={users} activeUser={activeUser} setActiveUser={setActiveUser}/>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
      >
        <RegistrationForm data={USER_INPUT_DATA}/>
      </Modal>
      <Modal
        isOpen={modalEditIsOpen}
        style={customStyle}
        onRequestClose={closeModalEdit}>
        <EditForm closeModal={closeModalEdit} data={USER_EDIT_DATA} activeUser={activeUser}/>
      </Modal>
    </div>

  )
}

export {Users}