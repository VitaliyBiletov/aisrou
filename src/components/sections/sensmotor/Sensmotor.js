import React from 'react'
import Subsection from '../subsection/Subsection'
import SENSMOTOR_DATA from "./SensmotorData"
import {connect} from 'react-redux'
import {setActiveItem} from "../../../pages/diag/diagActions";


class Sensmotor extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div className="diagnostic-section senso-motor-level">
                    <p>{this.props.artic}</p>
                    {SENSMOTOR_DATA.map(({name, title, instruction, data}, index) => {
                      const store = this.props.subsections.find(s=>s.name === name)
                      return (
                        <Subsection
                          key={index}
                          name={name}
                          title={title}
                          instruction={instruction}
                          data={data}
                          store={store}
                          setActiveItem={this.props.setActiveItem}
                        />

                      )
                    })}
                </div>
            )
        }
}

const mapStateToProps = state => {
  const { subsections } = state.diag.sensMotor
  return { subsections }
}

const mapDispatchToProps = {
  setActiveItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Sensmotor)