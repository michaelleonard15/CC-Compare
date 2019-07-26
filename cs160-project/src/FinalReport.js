import React from 'react'
import SchoolLabels from './SchoolLabels'
import RowGroup from './RowGroup'
import './App.css'

class FinalReport extends React.Component {


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



  render() {
    return (
      <div>
        <div align='right'>
          <button className="back_button"
                  onClick={this.props.backButton}>Back</button>
        </div>
        <SchoolLabels schoolList={["SRJC","SJSU","SSU"]} />
        {this.generateRows()}

        {/*<RequirementRow lookupTable={this.props.lookupTable}
                        requirements={this.props.requirements[0]}/>*/}
        

      </div>)
  }
}


export default FinalReport