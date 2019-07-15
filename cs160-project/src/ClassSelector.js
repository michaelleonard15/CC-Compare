import React from 'react'
import './App.css'

class ClassSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {courses: []}
  }

  generateButtons() {
    const courses = this.props.courses.slice(1)
    let buttons = courses.map( (name) => {
      return(
        <button className="class_selection_button">{name}</button>)
    })
    return buttons
  }

  render() {
    return (
      <div>
        <div align='right'>
        <button className="back_button"
                onClick={this.props.backButton}>Back</button>
        </div>
        <div className="class_selector">
          <h1> What classes have you completed at {this.props.courses[0]}? </h1>
          <br/>
          <div className="class_selector_container">
            {this.generateButtons()}
          </div>
        </div>
      </div>
    )
  }
}

export default ClassSelector