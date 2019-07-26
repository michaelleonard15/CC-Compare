import React from 'react'
import RelationGroup from './RelationGroup'
import './App.css'


/**
 * A component to contain groups of related classes.
 * The left most group rendered is always from the source school.
 * Groups from destination schools are rendered in the appropriate columns 
 * to the right. 
 * Contains
 *  RelationGroup 
 * Props
 *  key A unique identifier for this row
 *  lookupTable A Map of IDs to class objects
 *  requirements An array with relationships between class requirements.
 *  isComplete Boolean to indicate if requirements for classes (at destination) are completed
 *  handleToggle An onClick handler for toggle buttons
 *
 */
class RequirementRow extends React.Component {


  /**
   * Generates groups of classes from the requirements prop.
   * Each element of the requirements array becomes a RelationGroup component.
   * If a relation group contains no data, an empty placeholder div is created.
   * Returns an array of RelationGroup components.
   */
  generateGroups() {
    let req = this.props.requirements
    let groups = []
    for (let i = 0; i < req.length; i++) {
      if( (i > 0) && (req[i].classes[0].name === "") ) {
        groups.push(<div key={i} className="relation_group_empty"></div>)
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




  /**
   * Render function for the component. Renders the RelationGroups in the 
   * row by calling generateGroups().
   */
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
