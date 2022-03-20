import React, {useState, useEffect} from 'react'
import Table from "../../components/table/Table";
import {getAll} from "../../http/userAPI";
import {RegistrationForm} from "../../components/forms/RegistrationForm";
import Modal from 'react-modal'



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
  const [functions, setFunctions] = useState({})
  const [modalRegistrationIsOpen, setModalRegistrationIsOpen] = useState(false)

  console.log(props.data)

  useEffect(()=>{
    switch (props.type){
      case 'user': return setFunctions({
          isEdit: true,
          isResetPassword: true,
          isRemove: true
        })
      case 'student': return setFunctions({
        isEdit: true,
        isResetPassword: false,
        isRemove: true
      })
      default: return setFunctions({})
    }
  },[])

  function openModalRegistration() {
    setModalRegistrationIsOpen(true)
  }

  function closeModalRegistration() {
    setModalRegistrationIsOpen(false)
  }

  return (
    <div className='management'>
      <h2 className='management__title title'>{props.title}</h2>
      <div className='management__buttons'>
        <button className='management__button' onClick={openModalRegistration}>Зарегистрировать</button>
      </div>
      <div className='management__table'>
        {props.data.data ?
          <Table
            data={props.data.data}
            fields={props.data.fields}
            setData={props.setData}
            type={props.type}
            functions={functions}
          /> : null }
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
    </div>
  )
}

export {Management}