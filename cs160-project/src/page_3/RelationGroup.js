import React from 'react'




/**
 * A component to contain buttons or labels for individual classes or 
 * a group of related classes.
 * Contains
 *  HTML buttons and labels
 * Props
 *  key A unique identifier for this group
 *  isSourceCol Boolean, true if this is a group from the source column.
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
    let courses = this.props.group.courses
    let labels = []

    for(let or = 0; or < courses.length; or++) {
     
      if(or > 0) {
        labels.push(this.createRelation(labels.length, "OR"))
      }

      for(let and = 0; and < courses[or].length; and++) {
        if(and > 0) {
          labels.push(this.createRelation(labels.length, "AND"))
        }
        labels.push(this.addButtonOrLabel(labels.length, courses[or][and]))
      }

    }
 
  
  return labels
  }




  addButtonOrLabel(reactKey, lookupKey) {
    let temp = this.props.lookupTable.get(lookupKey)
    if(this.props.isSourceCol) {  
      let selected = temp.isSelected ? 'is-primary' : 'has-background-grey-lighter'
      return this.createButton(reactKey, selected, temp, lookupKey)
    } 
    else {
      let selected = this.props.completed ? 'has-background-primary' : 'has-background-grey-lighter'
      return this.createLabel(reactKey, selected, temp)
    }    
  }
  


  /**
   * Creates a button element with the button text containing
   * the name and number of units from aClass. 
   * @param key A unique identifier for this button in an array
   * @param selected A boolean indicating if this button should be selected or not selected
   * @param aCourse An object representing a class, containing properties for name and units.
   * @param lookupKey Identifier to find aClass in the lookupTable prop.
   * @return a div containing a button
   */
  createButton(key, selectedColor, aClass, lookupKey) {
    return (
      <span key={key} className="level">
        <button className={'button level-item ' + selectedColor}
                onClick={this.props.handleToggle.bind(this, lookupKey)}>
          <div>
            <span className="content">{aClass.courseID} ({aClass.units})</span> 
            <br/><br/> 
            <span className="content is-small">{aClass.courseName}</span>      
          </div>
        </button>
      </span>
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
  createLabel(key, completedColor, aClass)  {
    return (
      <span key={key} className={`level ${completedColor}`}>
        <span className='level-item'>{aClass.courseID} ({aClass.units}) </span>
      </span>
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
        <span key={key} className='level'>
          <span className='level-item relation_label'>{relation}</span>
        </span>
    )
  }  


  /**
   * Render function for the component. Renders an array or labels or buttons by
   * calling helper function generateLabels()
   */
  render () {
    return (
      <div className='box has-background-grey-light'>
        {this.generateLabels()}
      </div>
    )
  }
}

export default RelationGroup;

