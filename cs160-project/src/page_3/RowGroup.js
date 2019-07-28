import React from 'react'
import RequirementRow from './RequirementRow'
import '../App.css'


/**
 * A component to contain one or more RequirementRows and handle 
 * logic for determining if a requirement has been satisfied. 
 * Contains
 *  RequirementRow
 *
 * Props
 *  key A unique identifier for this row group
 *  lookupTable A Map of IDs to class objects
 *  equivalencySlice A one or two dimensional array with 
                     relationships between class equivalencySlice.
 *  handleToggle An onClick handler for toggle buttons. 
 */
class RowGroup extends React.Component {

  /**
   * Function to check if all of the requirements for this 
   * group of rows have been satisfied. Checks for completion of requirements
   * in each child row, and then evaluates the group of rows based on the relationship
   * defined in the equivalencySlice prop
   * Returns true or false
   */
  groupCompleted() {

    let boolArray = this.props.equivalencySlice.map((row) => 
      {return this.props.isRowCompleted(row)} )    

    let expr = boolArray[0]

    for(let i = 0; i < boolArray.length - 1; i++) {
      let row = this.props.equivalencySlice[i]
      let operator = row[0].relationToNext === "OR" ? "||" : "&&"
      expr += operator + boolArray[i +1]
    }

    return eval(expr)
  }





  /**
   * Maps equivalencySlice array to RequirementRow components. If more than
   * one row is present in the array, multipler RequirementRows are generated
   * and separated by a label showing the relationship between rows. 
   * Returns an array of RequirementRow components.
   */
  generateRows() {
    let rowsArray = this.props.equivalencySlice.map( (row, index) => {
      return (
         <RequirementRow  key={2 * index}
                          lookupTable={this.props.lookupTable}
                          equivalencyRow={this.props.equivalencySlice[index]}
                          isComplete={this.props.isRowCompleted(row)} 
                          handleToggle={this.props.handleToggle.bind(this)} />
      )
    })

    let len = rowsArray.length
    for (let i = 1; i < len; i++) {
      let operator = this.props.equivalencySlice[i - 1][0].relationToNext
      
      rowsArray.splice(i, 0, 
        <div key={i} className="operator_box">
          <label> {operator} </label>
        </div>
      )
    }
    return rowsArray
  }



  /**
   * Render function for the component. Renders child RequirementRow
   * components by calling the generateRows function.
   */
  render() {
    let completed = this.groupCompleted() ? 'complete' : 'incomplete'
    return(
      <div className={"row_group_" + completed}> 
        {this.generateRows()}
      </div>
    )
  }
}

export default RowGroup 