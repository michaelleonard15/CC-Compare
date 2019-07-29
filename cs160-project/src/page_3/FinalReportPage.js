import React from 'react'
import RowGroup from './RowGroup'
import '../App.css'




/**
 * Top level component for the third page of the application.
 * Contains
 *  A back button
 *  An array of lables for school names.
 *  An array of RowGroup components
 * Props
 *  lookupTable A Map of IDs to class objects
 *  equivalencyMatrix A 2D array with relationships between class equivalencies.
 *  handleToggle An onClick handler for toggle buttons. 
 *  backButton An onClick handler for the back button
 *  schoolList A list of school names to use as column labels.
 */
class FinalReportPage extends React.Component {


  /**
   * Generates an array of RowGroup components 
   * Itterates over the equivalencyMatrix prop, for any row that has
   * a relationToNext the following row is added to the same group.
   */
  generateRows() {
    let rows = []
    let matrix = this.props.equivalencyMatrix

    for(let i = 0; i < matrix.length; i++) {
      let temp = []
      temp.push(matrix[i])
    
      while(matrix[i][0].relationToNext !== "NONE") {
        temp.push(matrix[ i + 1 ])
        i += 1
      }
      rows.push(<RowGroup key={i}
                          lookupTable={this.props.lookupTable}
                          equivalencySlice={temp} 
                          handleToggle={this.props.handleToggle.bind(this)}
                          isRowCompleted={this.isRowCompleted.bind(this)} 
      />)
    }

    return rows
  }







  /**
    * Maps the schoolList prop to an array of labels with 
    * the names of the school as the label text. 
    */
  generateLabels() {
    return this.props.schoolList.map( (school, index) => {
      return (
        <div key={index} className='label_box'>
          <label className='school_label'>
            {school}
          </label>
        </div>
      )
    })
  }







  /**
   * Checks an individual row to see if the requirements have been 
   * satisfied. For a single requirement, returns the value of isSelected 
   * from the lookupArray. For multiple requirements, calls a helper function.
   * Returns true or false
   */
  isRowCompleted(row) {
    let courses = row[0].courses
    if( (courses.length === 1) && (courses[0].length === 1) ) {
      return this.props.lookupTable.get(courses[0][0]).isSelected
    }
    else {
      return this.handleConditionalRequirements(courses)
    }
  }



  /**
   * Given a set of IDs and relationships, checks if a
   * requirement has been satisfied by checking the isSelected of
   * each ID and building a boolean expression with the resulting 
   * true/false values and the relationships. 
   * Returns true or false
   */
  handleConditionalRequirements(courses) {   
    let { lookupTable }  = this.props
    let result_OR = false
    for(let or  = 0; or < courses.length; or++) {
      let result_AND = true
      for(let and  = 0; and < courses[or].length; and++) {
        result_AND = result_AND && lookupTable.get(courses[or][and]).isSelected
      }
      result_OR = result_OR || result_AND 
    }
    return result_OR
  }



  linkOriginalAgreements() {
    let links = this.props.agreementKeys.map( (key) => {
      return (
        <div className="link_box">
          <a className="agreement_link"
             target="_blank"
             href={`https://assist.org/transfer/report/${key}`}>See orginal Report</a>
        </div>
      )
    })
    links.splice(0, 0, <div className="link_box" />)
    return links
  }





  /**
   * Render function for the component. Creates a back button to 
   * return to page 2, creates a set of column labels and 
   * calls generateRows() to render the RowGroups.
   */
  render() {
    return (
      <div>
        <div align='right'>
          <button className="back_button"
                  onClick={this.props.backButton}>Back</button>
        </div>
        <div className="school_labels_row">
          {this.generateLabels()}
        </div>
        <div className="links_row">
          {this.linkOriginalAgreements()}
        </div>
        {this.generateRows()}

      </div>)
  }
}


export default FinalReportPage