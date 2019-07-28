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
    let IDs = row[0].IDs
    let relation = row[0].relation
    if(IDs.length === 1) {
      return this.props.lookupTable.get(IDs[0]).isSelected
    }
    else {
      return this.handleConditionalRequirements(IDs, relation)
    }
  }




  /**
   * Given a set of IDs and relationships, checks if a
   * requirement has been satisfied by checking the isSelected of
   * each ID and building a boolean expression with the resulting 
   * true/false values and the relationships. 
   * Returns true or false
   */
  handleConditionalRequirements(IDs, relation) {
    // Convert IDs in expr to corresponding boolean values.
    IDs = IDs.map( (ID) => {return this.props.lookupTable.get(ID).isSelected} )
    // Convert "AND", "OR" to "&&", "||"
    relation = relation.map( (bool) => {return bool === "OR"  ? "||" : "&&"}  )
    let expr = IDs[0]
    for(let i = 0; i < relation.length; i++) {
      expr += relation[i] + IDs[i +1]
    }
    return eval(expr)
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

        {this.generateRows()}

      </div>)
  }
}


export default FinalReportPage