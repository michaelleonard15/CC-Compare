import React from 'react'
import RelationGroup from './RelationGroup'
import './App.css'

class RequirementRow extends React.Component {

//lookupTable={this.props.lookupTable}
//requirements={this.props.requirements[0]}




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
                         completed={this.props.isComplete}
                         />
        )
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
