import React from 'react'
import RequirementRow from './RequirementRow'
import './App.css'

class FinalReport extends React.Component {



 // courseMatrix={this.state.courseMatrix}
 // handleToggle={this.handleToggle.bind(this)}
  //handleToggle(index) {
  //  this.props.handleToggle(index)
  //}


    /*
    <div align='right'>
        <button className="back_button"
                onClick={this.props.backButton}>Back</button>
        </div>

        <div>
          <h1> HELLO, WORLD! </h1>
        </div>

        <div>
          <SourceColumn courseMatrix={this.props.courseMatrix}
                        handleToggle={this.props.handleToggle} />
        </div>
    */


  render() {
    return (
      <div>
      <h1> HELLO, WORLD! </h1>
      <h3> From: FinalReport </h3>
        <RequirementRow lookupTable={this.props.lookupTable}
                        requirements={this.props.requirements[0]}/>
        

      </div>)
  }
}


export default FinalReport