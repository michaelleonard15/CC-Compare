import React from 'react'
import RequirementRow from './RequirementRow'
import './App.css'

class FinalReport extends React.Component {


  generateRows() {
    let rows = []
    for(let i = 0; i < this.props.requirements.length; i++) {
      //if (this.props.requirements[i][0].relationToNext === undefined) {
        rows.push(
          <RequirementRow key={i}
                          lookupTable={this.props.lookupTable}
                          requirements={this.props.requirements[i]}/>
          )
      /*} 
      else {
        let temp = []
        do {
          temp.push(this.props.requirements[i])
          i += 1
        } while(this.props.requirements[i].relationToNext !== undefined)
        rows.push(
          <RequirementRow lookupTable={this.props.lookupTable}
                        requirements={this.props.requirements[i]}/>
          )
        i += 1
      }*/
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
        <h1> HELLO, WORLD! </h1>
        <h3> From: FinalReport </h3>
        {this.generateRows()}

        {/*<RequirementRow lookupTable={this.props.lookupTable}
                        requirements={this.props.requirements[0]}/>*/}
        

      </div>)
  }
}


export default FinalReport