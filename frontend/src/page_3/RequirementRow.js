import React from 'react'
import RelationGroup from './RelationGroup'



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
 *  equivalencyRow An array with relationships between class requirements.
 *  isComplete Boolean to indicate if requirements for classes (at destination) are completed
 *  handleToggle An onClick handler for toggle buttons
 *
 */
class RequirementRow extends React.Component {


  /**
   * Generates groups of classes from the equivalencyRow prop.
   * Each element of the equivalencyRow array becomes a RelationGroup component.
   * If a relation group contains no data, an empty placeholder div is created.
   * Returns an array of RelationGroup components.
   */
  generateGroups() {
    let row = this.props.equivalencyRow
    let colWidth = 12 / row.length
    let groups = []
    for (let i = 0; i < row.length; i++) {
      if(row[i].courses.length < 1) {
        groups.push(<div key={i} className={`column is-${colWidth}`}></div>)
      } else {
      groups.push(
        <div key={i} className={`column final-report is-${colWidth}`}>
          <RelationGroup isSourceCol={i === 0}
                         lookupTable={this.props.lookupTable}
                         group={row[i]}
                         completed={this.props.isComplete}
                         handleToggle={this.props.handleToggle.bind(this)}
                         />
        </div>
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
    let completedColor = this.props.isComplete ? 'success' : 'grey-lighter'
    return (
        <div className={`columns is-vcentered has-background-${completedColor}`}>
          {this.generateGroups()}
        </div>
    )
  }
}

export default RequirementRow
