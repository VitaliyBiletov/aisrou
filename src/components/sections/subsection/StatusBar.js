import React from 'react'

export default class Subsection extends React.Component {
  render() {
    return (
      <div className="subsection">
        <div className="subsection_header">
          <h2>Сенсо-моторный уровень</h2>
        </div>
        <div className="subsection_description">
          <p>Здесь будет описание задания</p>
        </div>
        <div className="subsection_status-bar">
          <StatusBar />
        </div>
        <div>4</div>
        <div>5</div>
      </div>
    );
  }
}

