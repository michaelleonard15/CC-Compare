import React from 'react'
import RequirementRow from './RequirementRow'
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
                          handleToggle={this.props.handleToggle.bind(this)} />)
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