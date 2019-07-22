import React from 'react'
import RelationGroup from './RelationGroup'
import './App.css'

class RequirementRow extends React.Component {

//lookupTable={this.props.lookupTable}
//requirements={this.props.requirements[0]}

  generateGroups() {
    let req = this.props.requirements
    let groups = []
    for (let i = 0; i < req.length; i++) {
      groups.push(
          <RelationGroup lookupTable={this.props.lookupTable}
                         group={req[i]}
                         />
        )
    }
    return groups
  }

  render() {
    return (
      <div>
        <h1> HELLO, WORLD! </h1>
        <h3> From: RequirementRow </h3>
        {this.generateGroups()}
      </div>
    )
  }
}

export default RequirementRow
