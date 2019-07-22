import React from 'react'
import SourceRelationGroup from './SourceRelationGroup'
import DestinationRelationGroup from './DestinationRelationGroup'
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
    expr = expr.map( (ID) => {
      return this.props.lookupTable.get(ID).isSelected
    })
    let bool = false
    for (let i = 0; i < relation.length; i++) {
      if(relation[i] === 'AND') {
        expr.splice(i, 2, expr[i] && expr[i+1])
        relation.splice(i, 1)
      }
    }
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
    groups.push(
          <SourceRelationGroup lookupTable={this.props.lookupTable}
                         group={req[0]}
                         />)
    for (let i = 1; i < req.length; i++) {
      groups.push(
          <DestinationRelationGroup lookupTable={this.props.lookupTable}
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
