import React from 'react'

const soundLocation = {1:'Начало',2:'Середина',3:'Конец'}

export default class Sounds extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pathes:[],
            isLoading: false,
        }
    }

    render(){
        return(
            <div className='subsection-container'>
                <div className="sound-pronunciation-images">
                    {this.state.isLoading ? null : this.state.pathes.map((path, index) => (
                        <div key={index} className="sound-pronunciation-image">
                            <p>{soundLocation[parseInt(path.match(/\d+\./))]}</p>
                            <img src={path}/>
                        </div>))
                    }
                </div>
            </div>
        )
    }
}