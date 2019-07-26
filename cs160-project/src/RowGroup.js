import React from 'react'
import RequirementRow from './RequirementRow'
import './App.css'


/**
 * A component to contain one or more RequirementRows and handle 
 * logic for determining if a requirement has been satisfied. 
 * Contains
 *  RequirementRow
 *
 * Props
 *  key A unique identifier for this row group
 *  lookupTable A Map of IDs to class objects
 *  requirements A one or two dimensional array with 
                     relationships between class requirements.
 *  handleToggle An onClick handler for toggle buttons. 
 */
class RowGroup extends React.Component {

  /**
   * Function to check if all of the requirements for this 
   * group of rows have been satisfied. Checks for completion of requirements
   * in each child row, and then evaluates the group of rows based on the relationship
   * defined in the requirements prop
   * Returns true or false
   */
  groupCompleted() {

    let boolArray = this.props.requirements.map((row) => 
      {return this.isCompleted(row)} )    

    let expr = boolArray[0]

    for(let i = 0; i < boolArray.length - 1; i++) {
      let row = this.props.requirements[i]
      let operator = row[0].relationToNext === "OR" ? "||" : "&&"
      expr += operator + boolArray[i +1]
    }

    return eval(expr)
  }




  /**
   * Checks an individual row to see if the requirements have been 
   * satisfied. For a single requirement, returns the value of isSelected 
   * from the lookupArray. For multiple requirements, calls a helper function.
   * Returns true or false
   */
  isCompleted(row) {
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
   * Maps requirements array to RequirementRow components. If more than
   * one row is present in the array, multipler RequirementRows are generated
   * and separated by a label showing the relationship between rows. 
   * Returns an array of RequirementRow components.
   */
  generateRows() {
    let rowsArray = this.props.requirements.map( (row, index) => {
      return (
         <RequirementRow  key={2 * index}
                          lookupTable={this.props.lookupTable}
                          requirements={this.props.requirements[index]}
                          isComplete={this.isCompleted(row)} 
                          handleToggle={this.props.handleToggle.bind(this)} />
      )
    })

    let len = rowsArray.length
    for (let i = 1; i < len; i++) {
      let operator = this.props.requirements[i - 1][0].relationToNext
      
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