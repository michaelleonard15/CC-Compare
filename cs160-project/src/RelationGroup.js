import React from 'react'

import './App.css'

class RelationGroup extends React.Component {
  
  generateLabels() {
  let group = this.props.group
  let labels = []
  let max = this.props.sourceCol ? group.IDs.length : group.classes.length
  for(let i = 0; i < max; i++) {
  
    let selected = ""
    if(this.props.sourceCol) {
      let temp = this.props.lookupTable.get(group.IDs[i])
      selected = temp.isSelected ? 'selected' : 'not_selected'
      labels.push(this.createLabel(2*i, selected, temp, group.IDs[i]))
    } else {
      selected = this.props.completed ? 'selected' : 'not_selected'
      labels.push(this.createLabel(2*i, selected, group.classes[i], -1))
    }

    if(i < group.relation.length) {
      labels.push(this.createRelation(2*i + 1, group.relation[i]) )
    } 
  }
  return labels
}



  createLabel(key, selected, aClass, lookupID) {
    if(this.props.sourceCol) {
      return (
        <div key={key} className={'class_label_' + selected}>
          <button className={'report_toggle_' + selected}
                  onClick={this.props.handleToggle.bind(this, lookupID)}>
                  {aClass.name} ({aClass.units})
          </button>
        </div>
      )
    } else {
      return (
        <div key={key} className={'class_label_' + selected}>
          <label className='className'>{aClass.name}</label>
          <label className='units'> ({aClass.units}) </label>
        </div>
      )
    }
  }



  createRelation(key, relation) {
    return (
        <div key={key} className='relation'>
          <label className='relation_label'>{relation}</label>
        </div>
    )
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

