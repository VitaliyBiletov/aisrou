import React from 'react'
import COHERENT_SPEECH_DATA from './coherentSpeechData'
import Subsection from "../../../../components/subsection/Subsection";

export default class CoherentSpeech extends React.Component {
    render(){
        return (
            <div className="section">
                <h1 className="section__header">Связная речь</h1>
                <div className="section__container">
                    {COHERENT_SPEECH_DATA.map(({id, name, title, text, instruction, data, type}, index) => {
                        return (
                            <Subsection
                                key={id}
                                name={name}
                                section='coherentSpeech'
                                title={title}
                                instruction={instruction}
                                type={type}
                                text={text}
                                data={data}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}