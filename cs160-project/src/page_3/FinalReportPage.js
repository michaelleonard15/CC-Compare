import React from 'react'
import RowGroup from './RowGroup'
import RequirementRow from './RequirementRow'
import ConditionalGroup from './ConditionalGroup'
import evaluation from './evaluation'





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
        rows.push(
          <div key={i} className="section">
            {this.createConditionalGroup(slice, i, isComplete, condition)}
          </div>)
        i += condition.rows - 1
      }

      else if("relationToNext" in matrix[i][0]) {
        let slice = [matrix[i]]
        while("relationToNext" in matrix[i][0] && i < matrix.length) {
          slice.push(matrix[ i + 1 ])
          i += 1
        }
        rows.push(
          <div key={i} className="section">
            {this.createRowGroup(slice, i, isComplete)}
          </div>)
      }

      else {
        rows.push(
          <div key={i} className="section">
            {this.createRequirementRow(matrix[i], i, isComplete)}
          </div>)
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
    let colWidth = 12 / this.props.schoolList.length
    let labels = this.props.schoolList.map( (school, index) => {
      return (
        <div key={index} className={`column is-${colWidth} has-text-centered `}>
          <span className="box has-background-grey-lighter">
            <span className="content is-large">{school}</span>
          </span>
        </div>
      )
    })
    return labels
  }






  





  linkOriginalAgreements() {
    let colWidth = 12 / this.props.schoolList.length
    let links = []
    links.push(
      <div key="0" className={`column is-${colWidth} has-background-light`}>
        <span className="box has-background-grey-lighter has-text-centered">
          <span className="content">Use the links to the right to view 
                                    the original report on Assist.org</span>
        </span>
      </div>)
    if(colWidth < 12) {
      links = links.concat(this.props.agreementKeys.map( (key, index) => {
        return (
          <div key={index + 1} className={`column is-${colWidth} has-text-centered`}>
            <span className="box has-background-grey-lighter">
              <a className="content has-text-link"
                 target="_blank"
                 rel="noopener noreferrer"
                 href={`https://assist.org/transfer/report/${key}`}>See orginal Report</a>
            </span>
          </div>
        )
      })
      )
    }
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

        <div className="level">
          <div className='level-left'>
            <span className="title is-1">College Comparison Tool</span>
          </div>
          <div className="level-right">
            <button className="button is-large level-item"
                    onClick={this.props.backButton}>Back</button>
          </div>
        </div>
        <p className="content">
        Here is the report based on your selections. The requirements for 
        each school are listed in columns, with the corresponding classes at your community college 
        in the left most column. Below the schoool name is a link the original agreement from 
        Assist.org. Highlighted rows and sections indicate the requirement has already been satisfied. 
        If you need to make any changes to your selections from the previous page, you can click 
        the buttons in the left column. 
        </p>  
      
        <div className="box">
          <div className="section">
            <div className="box has-background-light">
              <div className="columns is-vcentered">
                {this.generateLabels()}
              </div>
            </div>
            <div className="box has-background-light">
              <div className="columns is-vcentered">
                {this.linkOriginalAgreements()}
              </div>
            </div>
          </div>
          {this.generateRows()}

        </div>
      </div>
    )
  }
}


export default FinalReportPage