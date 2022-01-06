import React from 'react'
import Subsection from '../subsection/Subsection'
import SENSMOTOR_DATA from "./SensmotorData"


export default class Sensmotor extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div className="diagnostic-section senso-motor-level">
                    {SENSMOTOR_DATA.map(({name, title, instruction, data}, index) => (
                                <Subsection
                                  key={index}
                                  name={name}
                                  title={title}
                                  instruction={instruction}
                                  data={data}
                                />

                    ))}
                </div>
            )
        }
}