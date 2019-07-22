import React from 'react'

import './App.css'


class SourceColumn extends React.Component {

  toggleClass(index) {
    this.props.handleToggle(index)
  }


  generateButtons() {
    let courses = this.props.courseMatrix.slice(1)
    let buttons = courses.map( (row, index) => {
    let buttonName = row[0] ? 'selected' : 'not_selected'
      return( 
        <button key={index}
                className={'class_toggle_' + buttonName}
                onClick={this.toggleClass.bind(this, index + 1)}>
          {row[1]}
        </button>
      )
    })
    return buttons
  }

 // courseMatrix={this.state.courseMatrix}
 // handleToggle={this.handleToggle.bind(this)}

  render() {
    return (
      <div className="source_column_box">
        <label>{this.props.courseMatrix[0][1]}</label>
        {this.generateButtons()}        
      </div>
    )
  }
}

export default SourceColumn