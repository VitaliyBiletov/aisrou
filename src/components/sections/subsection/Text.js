import React from 'react'

export default class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <div className='text-container'>
                <p>{this.props.text}</p>
              </div>
        )
    }
}