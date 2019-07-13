import React from 'react'
import './App.css'

class ClassSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {courses: []}
  }

  generateButtons() {
    const courses = this.props.courses.slice()
    let buttons = courses.map( (name) => {
      return(
        <button className="class_selection_button">{name}</button>)
    })
    return buttons
  }

  render() {
    return (
      <div className="class_selector">
        <h1> HELLO, WORLD! </h1>
        <br/>
        <div className="class_selector_container">
          {this.generateButtons()}
        </div>
      </div>
    )
  }
}

export default ClassSelector