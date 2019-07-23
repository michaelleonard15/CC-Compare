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
    let IDs = this.props.requirements[0].IDs
    let relation = this.props.requirements[0].relation
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
    relation = relation.map( (bool) => {return bool === "OR"  ? "||" : "&&"}  )
    let expr = IDs[0]
    for(let i = 0; i < relation.length; i++) {
      expr += relation[i] + IDs[i +1]
    }
    return eval(expr)
/*
    // Handle any && logic first. Splice the two arrays to 
    // remove the && and replace two bool values with the result.
    for (let i = 0; i < relation.length; i++) {
      if(relation[i] === 'AND') {
        expr.splice(i, 2, (expr[i] && expr[i+1]) )
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
    */
  }


  generateGroups() {
    let req = this.props.requirements
    let groups = []
   // if(req[0].constructor === Array) {
   //   for(let i = 0; i < req[0].length; i++) {
   //     for(let j = 0; j < req.lenght; j++) {
   //
   //     }
   //   }
   // }

    for (let i = 0; i < req.length; i++) {
      groups.push(
          <RelationGroup key={i}
                         sourceCol={i === 0}
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
