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
    // Convert "AND", "OR" to "&&", "||"
    relation = relation.map( (bool) => {return bool === "OR"  ? "||" : "&&"}  )
    let expr = IDs[0]
    for(let i = 0; i < relation.length; i++) {
      expr += relation[i] + IDs[i +1]
    }
    return eval(expr)
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
