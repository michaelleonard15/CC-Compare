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
      if( (i > 0) && (req[i].classes[0].name === "") ) {
        groups.push(<div className="relation_group_empty"></div>)
      } else {
      groups.push(
          <RelationGroup key={i}
                         sourceCol={i === 0}
                         lookupTable={this.props.lookupTable}
                         group={req[i]}
                         completed={this.props.isComplete}
                         handleToggle={this.props.handleToggle.bind(this)}
                         />
        )
    }
    }
    return groups
  }





  render() {
    let completed = this.props.isComplete ? 'complete' : 'incomplete'
    return (
      <div className={'requirement_row_' + completed}>
        {this.generateGroups()}
      </div>
    )
  }
}

export default RequirementRow
