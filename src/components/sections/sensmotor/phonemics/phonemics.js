import React from 'react'
import pairsOfSounds from "./PairsOfSounds.json";

export default class Phonemics extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='text-container'>
                <p>{pairsOfSounds[0].text}</p>
            </div>)
    }
}
