import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setValueStatFunc} from "../../redux/actions/subsectionActions";


function StateFunc(props){

  const store = useSelector(({diagnostic})=>diagnostic.subsections.stateOfFunc)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setValueStatFunc(e.target.name, e.target.value))
  }

  return (
    <div className="section__container">
      <div className="stateOfFunc__form">
        {props.data.map((field, index) => (
          <div className="stateOfFunc__item" key={index}>
            <label className="stateOfFunc__label">{field.title}</label>
            <textarea
              className="stateOfFunc__text-area"
              onChange={handleChange}
              name={field.name}
              title={field.title}
              value={store[field.name]}
            />
          </div>
          )
        )
      }
      </div>
    </div>
  )
}

export default StateFunc