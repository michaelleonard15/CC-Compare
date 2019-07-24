import React from 'react'
import RequirementRow from './RequirementRow'
import './App.css'

class RowGroup extends React.Component {

  // lookupTable={this.props.lookupTable}
  //requirements={this.props.requirements}

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




  generateRows() {
    return this.props.requirements.map( (row, index) => {
      return (
         <RequirementRow  key={index}
                          lookupTable={this.props.lookupTable}
                          requirements={this.props.requirements[index]}
                          isComplete={this.isCompleted(row)} />
      )
    })
  }




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