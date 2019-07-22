import React from 'react'

import './App.css'

class RelationGroup extends React.Component {
  
  generateLabels() {
  let group = this.props.group
  let labels = []
  for(let i = 0; i < group.name.length; i++) {
  
    let selected 
    if(typeof group.expr === 'undefined') {
      selected = this.props.completed ? 'selected' : 'not_selected'
    } else {
      let temp = this.props.lookupTable.get(group.expr[i])
      selected = temp.isSelected ? 'selected' : 'not_selected'
    }

    labels.push(
      <div key={2*i} className={'class_label_' + selected}>
        <label className='className'>{group.name[i]}</label>
        <label className='units'> ({group.units[i]})</label>
      </div>
    )
    if(i < group.relation.length) {
      labels.push(
        <div key={2*i + 1} className='relation'>
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

export default RelationGroup;

