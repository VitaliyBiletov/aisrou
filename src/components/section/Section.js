import React from 'react'
import Subsection from "../subsection/Subsection";
import StateFunc from "../stateFunc/StateFunc";


export default class Section extends React.Component{
  render(){
    const {title, data, type} = this.props
    return(
      <div className={`section ${name}`}>
        <h1 className="section__header">{title}</h1>
        <div className="section__container">
          { type==="tasks" ?
          data.map(({id, name, title, text, instruction, data, type, hints}) => {
            return (
              <Subsection
                key={id}
                name={name}
                section={this.props.name}
                title={title}
                instruction={instruction}
                type={type}
                text={text}
                data={data}
                hints={hints}
              />
            )
          }) :
            <StateFunc
              name={name}
              data={data}
              title={title}
            />
          }
        </div>
      </div>
    )
  }
}