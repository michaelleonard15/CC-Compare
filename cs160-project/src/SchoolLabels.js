import React from 'react'
import './App.css'

class SchoolLabels extends React.Component {


  generateLabels() {
    return this.props.schoolList.map( (school) => {
      return (
        <div className='label_box'>
          <label className='school_label'>
            {school}
          </label>
        </div>
      )
    })
  }



  render() {
    return (
      <div className="school_labels_row">
        {this.generateLabels()}
      </div>
    )
  }



}


export default SchoolLabels