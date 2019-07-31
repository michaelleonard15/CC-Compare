import React from 'react'
import RequirementRow from './RequirementRow'



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
                          isComplete={this.props.isComplete.row(row)} 
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
    let isComplete = this.props.isComplete
    let slice = this.props.equivalencySlice
    let groupCompleted = isComplete.rowGroup(slice) ? 'complete' : 'incomplete'
    return(
      <div className={"row_group_" + groupCompleted}> 
        {this.generateRows()}
      </div>
    )
  }
}

export default RowGroup 