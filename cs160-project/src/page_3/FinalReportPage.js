import React from 'react'
import RowGroup from './RowGroup'
import RequirementRow from './RequirementRow'
import ConditionalGroup from './ConditionalGroup'
import evaluation from './evaluation'
import '../App.css'




/**
 * Top level component for the third page of the application.
 * Contains
 *  A back button
 *  An array of lables for school names.
 *  An array of RowGroup components
 * Props
 *  lookupTable A Map of IDs to class objects
 *  equivalencyMatrix A 2D array with relationships between class equivalencies.
 *  handleToggle An onClick handler for toggle buttons. 
 *  backButton An onClick handler for the back button
 *  schoolList A list of school names to use as column labels.
 */
class FinalReportPage extends React.Component {


  /**
   * Generates an array of RowGroup components 
   * Itterates over the equivalencyMatrix prop, for any row that has
   * a relationToNext the following row is added to the same group.
   */
  generateRows() {
    let rows = []
    let matrix = this.props.equivalencyMatrix
    let isComplete = evaluation(this.props.lookupTable)

    for(let i = 0; i < matrix.length; i++) {
      
      if("condition" in matrix[i][0]) {
        let condition = matrix[i][0].condition
        let slice = []
        for(let temp = 0; temp < condition.rows; temp++) {
          slice.push(matrix[temp + i])
        }
        rows.push(this.createConditionalGroup(slice, i, isComplete, condition))
        i += condition.rows - 1
      }

      else if("relationToNext" in matrix[i][0]) {
        let slice = [matrix[i]]
        while("relationToNext" in matrix[i][0] && i < matrix.length) {
          slice.push(matrix[ i + 1 ])
          i += 1
        }
        rows.push(this.createRowGroup(slice, i, isComplete))
      }

      else {
        rows.push(this.createRequirementRow(matrix[i], i, isComplete))
      }
    }

    return rows
  }


  createConditionalGroup(slice, index, isComplete, condition) { 
    return (
      <ConditionalGroup
        key={index}
        lookupTable={this.props.lookupTable}
        equivalencySlice={slice}
        handleToggle={this.props.handleToggle.bind(this)}
        isComplete={isComplete}
        />
    )
  }



  createRowGroup(slice, index, isComplete) {
    return (
      <RowGroup 
        key={index}
        lookupTable={this.props.lookupTable}
        equivalencySlice={slice} 
        handleToggle={this.props.handleToggle.bind(this)}
        isComplete={isComplete}   />
    )
  }



  createRequirementRow(row, index, isComplete) {
    return (
         <RequirementRow  
          key={index}
          lookupTable={this.props.lookupTable}
          equivalencyRow={row}
          isComplete={isComplete.row(row)} 
          handleToggle={this.props.handleToggle.bind(this)} />
    )
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




  





  linkOriginalAgreements() {
    let links = this.props.agreementKeys.map( (key, index) => {
      return (
        <div key={index + 1} className="link_box">
          <a className="agreement_link"
             target="_blank"
             rel="noopener noreferrer"
             href={`https://assist.org/transfer/report/${key}`}>See orginal Report</a>
        </div>
      )
    })
    links.splice(0, 0, <div key="0" className="link_box" />)
    return links
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
        <div className="links_row">
          {this.linkOriginalAgreements()}
        </div>
        {this.generateRows()}

      </div>)
  }
}


export default FinalReportPage