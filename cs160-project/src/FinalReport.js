import React from 'react'
import SourceColumn from './SourceColumn'
import DestinationColumnContainer from './DestinationColumnContainer'
import './App.css'

class FinalReport extends React.Component {



 // courseMatrix={this.state.courseMatrix}
 // handleToggle={this.handleToggle.bind(this)}
  //handleToggle(index) {
  //  this.props.handleToggle(index)
  //}

  render() {
    return (
      <div>

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

      </div>)
  }
}


export default FinalReport