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
   * the lookupTable. Classes are sorted in alphabetical order.
   */
  getCoursesList() {
    let courses = []
    this.props.lookupTable.forEach( (value, key, map) => {
      if(value.isOrigin) {
        courses.push({course: value, ID: key})
      }
    })
    return courses.sort( (c1, c2) => {
      let name1 = c1.course.courseID.toUpperCase()
      let name2 = c2.course.courseID.toUpperCase()
      return (name1 < name2) ? -1 : 
             (name1 > name2) ? 1  : 0
    })
  }



  /**
   * Maps the array of courses from props to an
   * array of toggle buttons. Button text is set to 
   * the course name, and the onClick is handled by the handleToggle prop
   */
  generateButtons() {
    let buttons = this.getCoursesList().map( (row) => {  
      let selectedColor = row.course.isSelected ? 'is-primary' : 'has-background-grey-lighter'
      let name = row.course.courseName


      return(
        <button   key={row.ID}
                className={'button ' + selectedColor}
                onClick={ () => {this.props.handleToggle(row.ID)} }
        >
          <div>
            <span className="content">{row.course.courseID}</span> 
            <br/> 
            {this.multilineButtonText(name)}
          </div>
        </button>
      )
    })
    return buttons
  }


  multilineButtonText(name) {
    if(name.length < 20 || name.indexOf(" ", 20) < 0) {
          return(<span className="content is-small">{name}</span>)
        } 
        else {
          let space = name.indexOf(" ", 20)
          let p1 = name.slice(0, space)
          let p2 = name.slice(space + 1)
          return(
            <div>
              <span className="content is-small">{p1}</span>
              <br/>
              <span className="content is-small">{p2}</span>
            </div>
            )
        }
  }




  /**
   * Render function for the component. Places the back button,
   * the next button, and calls generateButtons() to render the 
   * toggle buttons for each class.
   */
  render() {
    return (
      <div>
        <h1 className="title is-1">CC Compare</h1>

        <p className="content">
        To present more useful information on the report 
        we have generated, please select the classes you have already completed. 
        This will highlight requirements you have already completed on the next page. 
        </p>


        <div className="box">  
          <div className="columns">
          
            <div className="column is-half is-offset-one-quarter">
              <div className="box has-background-light">
                <h3 className="title has-text-centered"> 
                  What classes have you completed at {this.props.schoolName}? 
                </h3>
      
                <div className="buttons is-centered are-medium">
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
        </div>
      </div>
    )
  }
}

export default CourseSelectorPage