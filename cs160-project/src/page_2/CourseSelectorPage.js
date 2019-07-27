import React from 'react'




/**
 * Top level component for the second page of the application.
 * Contains
 *  A back button
 *  A array html buttons. 
 *  A next button
 *
 * props
 *  courses An array of class objects.
 *  handleToggle A function to be used for the onClick property of buttons
 *  backButton A onClick handler for the back button
 *  loadNextPage A onClick handler for the next button
 *
 */
class CourseSelectorPage extends React.Component {



  /**
   * Returns an array of class objects from the values stored in 
   * the lookupTable
   */
  getCoursesList() {
    let courses = []
    this.props.lookupTable.forEach( (value, key, map) => {
      courses.push({course: value, ID: key})
    } )
    return courses
  }



  /**
   * Maps the array of courses from props to an
   * array of toggle buttons. Button text is set to 
   * the course name, and the onClick is handled by the handleToggle prop
   */
  generateButtons() {
    let buttons = this.getCoursesList().map( (row) => {  
      let selectedColor = row.course.isSelected ? 'is-primary' : 'has-background-grey-lighter'
      return(
        <button key={row.ID}
                className={'button is-large ' + selectedColor}
                onClick={ () => {this.props.handleToggle(row.ID)} }
        >
          {row.course.name}
        </button>
      )
    })
    return buttons
  }


  /**
   * Render function for the component. Places the back button,
   * the next button, and calls generateButtons() to render the 
   * toggle buttons for each class.
   */
  render() {
    return (
      <div className="columns">
      
        <div className="column is-half is-offset-one-quarter">
          <div className="box has-background-light">
            <h3 className="title has-text-centered"> What classes have you completed at DUMMY DATA? </h3>
  
            <div className="buttons is-centered">
              {this.generateButtons()}
            </div>
          
          
            <div className="level is-mobile">
  
              <div className="level-left">
                <button className="button is-large level-item"
                        onClick={this.props.backButton}>Back</button>
              </div>
                  
              <div className="level-right">
                <button className="button is-large level-item"
                        onClick={this.props.loadNextPage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseSelectorPage