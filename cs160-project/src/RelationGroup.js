import React from 'react'

import './App.css'

class RelationGroup extends React.Component {
  


  generateLabels() {
  let group = this.props.group
  let labels = []
  for(let i = 0; i < group.name.length; i++) {
    labels.push(
      <div className='buttonBox'>
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
      <div className='greyBox'>
        <h1> HELLO, WORLD! </h1>
        <h3> From: RelationGroup </h3>
        {this.generateLabels()}
      </div>
    )
  }

}

export default RelationGroup
