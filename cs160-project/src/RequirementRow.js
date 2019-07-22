import React from 'react'
import RelationGroup from './RelationGroup'
import './App.css'

class RequirementRow extends React.Component {

//lookupTable={this.props.lookupTable}
//requirements={this.props.requirements[0]}
  constructor(props) {
    super(props)

    this.state = {completed: this.isCompleted()}
  }

  /*
    If you're reading this, I'm sorry.
    This code is bad and I feel bad. 
    Hopefully it's only temporary.
  */
  isCompleted() {
    let expr = this.props.requirements[0].expr
    let relation = this.props.requirements[0].relation
    if(expr.length === 1) {
      return this.props.lookupTable.get(expr[0]).isSelected
    }
    else {
      return this.handleConditionalRequirements(expr, relation)
    }
  }

  handleConditionalRequirements(expr, relation) {
    
    // Convert IDs in expr to corresponding boolean values.
    expr = expr.map( (ID) => {
      return this.props.lookupTable.get(ID).isSelected
    })

    // Handle any && logic first. Splice the two arrays to 
    // remove the && and replace two bool values with the result.
    for (let i = 0; i < relation.length; i++) {
      if(relation[i] === 'AND') {
        expr.splice(i, 2, expr[i] && expr[i+1])
        relation.splice(i, 1)
      }
    }

    // Handle any || operations next.
    let bool = false
    for(let i = 0; i < relation.length; i++) {
      if(relation[i] === 'OR') {
        bool = bool || expr[i] || expr[i+1]
      }
    }
    return bool
  }




  generateGroups() {
    let req = this.props.requirements
    let groups = []
    for (let i = 0; i < req.length; i++) {
      groups.push(
          <RelationGroup key={i}
                         lookupTable={this.props.lookupTable}
                         group={req[i]}
                         completed={this.state.completed}
                         />
        )
    }
    return groups
  }

  render() {
    let completed = this.state.completed ? 'complete' : 'incomplete'
    return (
      <div className={'requirement_row_' + completed}>
        {this.generateGroups()}
      </div>
    )
  }
}

export default RequirementRow
