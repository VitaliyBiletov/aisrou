import React from 'react'
import {SOUND_SYLLABLES} from "./soundSyllables";


export default class Syllable extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='sound-sullable-image'>
                {/*<img style={{width:'200px'}} src={`/static/src/main/img/sound-syllabic/${this.props.index}.jpg`}/>*/}
            </div>
        )
    }
}