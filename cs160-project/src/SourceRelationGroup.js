import React from 'react'

import './App.css'

class SourceRelationGroup extends React.Component {
  
  generateLabels() {
  let group = this.props.group
  let labels = []
  for(let i = 0; i < group.name.length; i++) {
    let temp = this.props.lookupTable.get(group.expr[i])
    let selected = temp.isSelected ? 'selected' : 'not_selected'
    labels.push(
      <div className={'class_label_' + selected}>
        <label className='className'>{group.name[i]}</label>
        <label className='units'> ({group.units[i]})</label>
      </div>
    )
    if(i < group.relation.length) {
      labels.push(
        <div className='relation'>
          <label className='relation_label'>{group.relation[i]}</label>
        </div>
      )
    } 
  }
  return labels

}

  render () {
    return (
      <div className='relation_group'>
        {this.generateLabels()}
      </div>
    )
  }
}

export default SourceRelationGroup;

