import React from 'react'
import RowGroup from './RowGroup'
import './App.css'




/**
 * Top level component for the third page of the application.
 * Contains
 *  A back button
 *  An array of lables for school names.
 *  An array of RowGroup components
 * Props
 *  lookupTable A Map of IDs to class objects
 *  requirements A 2D array with relationships between class requirements.
 *  handleToggle An onClick handler for toggle buttons. 
 *  backButton An onClick handler for the back button
 *  schoolList A list of school names to use as column labels.
 */
class FinalReport extends React.Component {


  /**
   * Generates an array of RowGroup components 
   * Itterates over the requirements prop, for any row that has
   * a relationToNext the following row is added to the same group.
   */
  generateRows() {
    let rows = []

    for(let i = 0; i < this.props.requirements.length; i++) {
      let temp = []
      temp.push(this.props.requirements[i])
    
      while(this.props.requirements[i][0].relationToNext !== "NONE") {
        temp.push(this.props.requirements[ i+1 ])
        i += 1
      }
      rows.push(<RowGroup key={i}
                          lookupTable={this.props.lookupTable}
                          requirements={temp} 
                          handleToggle={this.props.handleToggle.bind(this)} 
      />)
    }

    return rows
  }


  /**
    * Maps the schoolList prop to an array of labels with 
    * the names of the school as the label text. 
    */
  generateLabels() {
    return this.props.schoolList.map( (school, index) => {
      return (
        <div key={index} className='label_box'>
          <label className='school_label'>
            {school}
          </label>
        </div>
      )
    })
  }



  /**
   * Render function for the component. Creates a back button to 
   * return to page 2, creates a set of column labels and 
   * calls generateRows() to render the RowGroups.
   */
  render() {
    return (
      <div>
        <div align='right'>
          <button className="back_button"
                  onClick={this.props.backButton}>Back</button>
        </div>
        <div className="school_labels_row">
          {this.generateLabels()}
        </div>

        {this.generateRows()}

      </div>)
  }
}


export default FinalReport