import React from 'react'
import './App.css'



/**
 * A component to contain buttons or labels for individual classes or 
 * a group of related classes.
 * Contains
 *  HTML buttons and labels
 * Props
 *  key A unique identifier for this group
 *  sourceCol Boolean, true if this is a group from the source column.
 *  lookupTable A Map of IDs to class objects
 *  group An array of class objects or IDs, and an array of strings describing 
 *    the relationship between them.
 *  completed Boolean, true if the requirement for the class is 
      satisfied (destination column).
 *  handleToggle An onClick handler for toggle buttons (source column)
 */
class RelationGroup extends React.Component {
  


  /**
   * Generates an array of labels or buttons. 
   * For the source column, toggle buttons are generated with 
   * the class names used for button text. For all other columns labels
   * are used for class names. If there are multiple classes, a relationship label is
   * displayed between the buttons/labels for classes.
   * Returns an array of buttons or an array of labels. 
   */
  generateLabels() {
  let group = this.props.group
  let labels = []
  let max = this.props.sourceCol ? group.IDs.length : group.classes.length
  
  for(let i = 0; i < max; i++) {
  
    if(this.props.sourceCol) {
      let temp = this.props.lookupTable.get(group.IDs[i])
      let selected = temp.isSelected ? 'selected' : 'not_selected'
      labels.push(this.createButton(2*i, selected, temp, group.IDs[i]))
    } 
    else {
      let selected = this.props.completed ? 'selected' : 'not_selected'
      labels.push(this.createLabel(2*i, selected, group.classes[i]))
    }

    if(i < group.relation.length) {
      labels.push(this.createRelation(2*i + 1, group.relation[i]) )
    } 
  }
  
  return labels
  }

  


  /**
   * Creates a button element with the button text containing
   * the name and number of units from aClass. 
   * @param key A unique identifier for this button in an array
   * @param selected A boolean indicating if this button should be selected or not selected
   * @param aClass An object representing a class, containing properties for name and units.
   * @param lookupID Identifier to find aClass in the lookupTable prop.
   * @return a div containing a button
   */
  createButton(key, selected, aClass, lookupID) {
    return (
      <div key={key} className={'class_label_' + selected}>
        <button className={'report_toggle_' + selected}
                onClick={this.props.handleToggle.bind(this, lookupID)}>
                {aClass.name} ({aClass.units})
        </button>
      </div>
    )
  }




  /**
   * Creates a label element with the text containing
   * the name and number of units from aClass. 
   * @param key A unique identifier for this label in an array
   * @param completed A boolean indicating if this label should be highlighted as
                complete or not.
   * @param aClass An object representing a class, containing properties for name and units.
   * @return a div containing a label
   */
  createLabel(key, completed, aClass)  {
    return (
      <div key={key} className={'class_label_' + completed}>
        <label className='className'>{aClass.name}</label>
        <label className='units'> ({aClass.units}) </label>
      </div>
    )
  }





   /**
   * Creates a label element with the text containing relation between two classes. 
   * @param key A unique identifier for this label in an array
   * @param relation a string containing either "AND" or "OR"
   * @return a div containing a label
   */
  createRelation(key, relation) {
    return (
        <div key={key} className='relation'>
          <label className='relation_label'>{relation}</label>
        </div>
    )
  }  


  /**
   * Render function for the component. Renders an array or labels or buttons by
   * calling helper function generateLabels()
   */
  render () {
    return (
      <div className='relation_group'>
        {this.generateLabels()}
      </div>
    )
  }
}

export default RelationGroup;

