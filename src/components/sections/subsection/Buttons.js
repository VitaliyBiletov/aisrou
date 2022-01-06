import React from "react"

const colors = ['red', 'yellow', 'blue', 'green']

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = e => {
        e.preventDefault()
    }

    render() {
        return (
            <div className="scores-buttons">
                <div className='score-buttons-container'>
                    {colors.map((button, index) => (
                        <button
                            key={index}
                            className={`${colors[index]}`}
                            value={index}
                            onClick={this.handleClick}
                        /> //{index}
                    ))}
                </div>
            </div>
        );
    }
}

export default Buttons

