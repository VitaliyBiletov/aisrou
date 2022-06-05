import React, {useState, useEffect} from 'react'
import Table from "../../components/table/Table";
import {getAll} from "../../http/userAPI";
import RegistrationForm from "../../components/forms/RegistrationForm";
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

export default function Management(props) {
    const [functions, setFunctions] = useState({})
    const [modalRegistrationIsOpen, setModalRegistrationIsOpen] = useState(false)

    useEffect(() => {
        switch (props.type) {
            case 'users':
                return setFunctions({
                    isEdit: true,
                    isResetPassword: true,
                    isRemove: true
                })
            case 'students':
                return setFunctions({
                    isEdit: true,
                    isResetPassword: false,
                    isRemove: true
                })
            default:
                return setFunctions({})
        }
    }, [])

    function openModalRegistration() {
        setModalRegistrationIsOpen(true)
    }

    function closeModalRegistration() {
        setModalRegistrationIsOpen(false)
    }

    return (
        <div className='admin-section management'>
            <h2 className='admin-section__title'>{props.title}</h2>
            <div className='admin-section__container'>
                <div className='management__buttons'>
                    <button className='admin-section__button' onClick={openModalRegistration}>Зарегистрировать</button>
                </div>
                <div className='management__table'>
                    {props.data ?
                        <Table
                            data={props.data}
                            fields={props.fields}
                            setData={props.setData}
                            type={props.type}
                            functions={functions}
                        /> : null}
                </div>
                {modalRegistrationIsOpen ?
                    <Modal isOpen={modalRegistrationIsOpen} onRequestClose={closeModalRegistration} style={customStyle}>
                        <RegistrationForm
                            type={props.type}
                            data={props.data}
                            setData={props.setData}
                            fields={props.fields}
                            close={closeModalRegistration}
                        />
                    </Modal> : null
                }
            </div>
        </div>
    )
}