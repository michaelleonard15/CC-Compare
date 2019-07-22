import React from 'react'
import './App.css'

class ClassSelector extends React.Component {


  toggleClass(index) {
    this.props.handleToggle(index)
  }

  generateButtons() {
    const courses = this.props.courses.slice()
    let buttons = courses.map( (row, index) => {
    let buttonName = row.isSelected ? 'selected' : 'not_selected'
      return(
        <button key={index}
                className={'class_toggle_' + buttonName}
                onClick={this.toggleClass.bind(this, index)}
        >
          {row.name}
        </button>
      )
    })
    return buttons
  }

  render() {
    return (
      <div className="page_two">

        <div align='right'>
        <button className="back_button"
                onClick={this.props.backButton}>Back</button>
        </div>
      
        <div className="class_selector">
          <h1> What classes have you completed at DUMMY DATA? </h1>
          <br/>

          <div className="class_selector_container">
            {this.generateButtons()}
          </div>
        
        </div>
        
         <div className="next_button_box">
            <button className="next_button"
                    onClick={this.props.loadNextPage}>Next</button>
          </div>

      </div>
    )
  }
}

export default ClassSelector