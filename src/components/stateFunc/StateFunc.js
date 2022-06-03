import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setValueStatFunc} from "../../redux/actions/tasksActions";


function StateFunc(props){

  const store = useSelector(state=>state.diagnostic.tasks.stateOfFunc)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setValueStatFunc(e.target.name, e.target.value))
  }

  return (
    <div className="stateOfFunc__form">
      {props.data.map((field, index) => (
        <div className="stateOfFunc__item" key={index}>
          <label className="stateOfFunc__label" htmlFor={field.name}>{field.title}</label>
          <textarea
            className="stateOfFunc__text-area"
            onChange={handleChange}
            id={field.name}
            name={field.name}
            title={field.title}
            value={store[field.name]}
          />
        </div>
        )
      )
    }
    </div>
  )
}

export default StateFunc