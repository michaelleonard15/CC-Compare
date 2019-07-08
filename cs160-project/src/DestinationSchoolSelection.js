import React from 'react'
import SpecificMajorSelection from './SpecificMajorSelection'


class DestinationSchoolSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {agreements: []}
    this.state.agreements.push(<SpecificMajorSelection   key="0"
                                          listIndex="0" 
                                        destinationSchools={props.destinationSchools}
                                        removeAgreement={this.removeAgreement} />)
  }



  addAgreement = () => {
    let newList = this.state.agreements
    newList.push(<SpecificMajorSelection   key={newList.length}
                                          listIndex={newList.length} 
                                        destinationSchools={this.props.destinationSchools}
                                        removeAgreement={this.removeAgreement} />)
    this.setState({agreements: newList})
  }

  removeAgreement = (num) => {
    let newList = this.state.agreements.filter( (agreement, index) => {
        return num !== index } )
    this.setState({agreements: newList})
  }


  render() {
    return (
      <div>
      <div>{this.state.agreements}</div>
      <div align="center">
          <button onClick={this.addAgreement}>Click me!</button>
      </div>
      </div>
    )
  }

}


export default DestinationSchoolSelection