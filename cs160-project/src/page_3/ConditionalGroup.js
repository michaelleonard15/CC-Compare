import React from 'react'
import RowGroup from './RowGroup'
import RequirementRow from './RequirementRow'
import evaluation from './evaluation'



class ConditionalGroup extends React.Component {
  
  //props: requirementSlice  


  generateRows() {
    let rows = []
    let matrix = this.props.equivalencySlice
    let isComplete = evaluation(this.props.lookupTable)

    for(let i = 0; i < matrix.length; i++) {
      if("relationToNext" in matrix[i][0]) {
          let slice = [matrix[i]]
          while("relationToNext" in matrix[i][0] && i < matrix.length) {
            slice.push(matrix[ i + 1 ])
            i += 1
          }
          rows.push(this.createRowGroup(slice, i, isComplete))
        }
      else {
        rows.push(this.createRequirementRow(matrix[i], i, isComplete))
      }
    }
    return rows
  }

    
  createRowGroup(slice, index, isComplete) {
    return (
      <RowGroup 
        key={index}
        lookupTable={this.props.lookupTable}
        equivalencySlice={slice} 
        handleToggle={this.props.handleToggle.bind(this)}
        isComplete={isComplete}   />
    )
  }



  createRequirementRow(row, index, isComplete) {
    return (
         <RequirementRow  
          key={index}
          lookupTable={this.props.lookupTable}
          equivalencyRow={row}
          isComplete={isComplete.row(row)} 
          handleToggle={this.props.handleToggle.bind(this)} />
    )
  }



  render() {
    let isComplete = this.props.isComplete
    let slice = this.props.equivalencySlice
    let condition = slice[0][0].condition
    let groupCompleted = isComplete.conditionalGroup(slice, condition) ? 'success' : 'purple'
    return(
        <div className={"box extra-padding has-background-" + groupCompleted}> 
          <span className="level">   
            <h4 className="level-item title is-4">
              Complete {condition.number} {condition.type.toLowerCase()} from the following: 
            </h4>
          </span> 
          {this.generateRows()}
        </div>
    )
  }
}

export default ConditionalGroup