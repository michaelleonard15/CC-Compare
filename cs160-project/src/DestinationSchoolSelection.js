import React from 'react'
import SpecificMajorSelection from './SpecificMajorSelection'


class DestinationSchoolSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {agreements: [0]}
  }

  addAgreement = () => {
    let temp = this.state.agreements
    let lastIndex = temp.length - 1
    temp.push(temp[lastIndex] + 1)
    this.setState({agreements: temp})
  }

  generateMenus = () => {
    let agreements = []
    let IDs = this.state.agreements
    for(let i = 0; i < IDs.length; i++) {
      agreements.push(<SpecificMajorSelection   key={IDs[i]}
                                          listIndex={IDs[i]}
                                        destinationSchools={this.props.destinationSchools}
                                        removeAgreement={this.removeAgreement} />)
    }
    return agreements
  }

  removeAgreement = (num) => {
      if(this.state.agreements.length > 1) {
      let newList = this.state.agreements.filter( (agreement) => {
          return num !== agreement } )
      this.setState({agreements: newList})
    }
  }

/*
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
*/

  render() {
    return (
      <div>
        <div>
          {/*{this.state.agreements}*/}
          {this.generateMenus()}
        </div>
        <div align="center">
          <button onClick={this.addAgreement}>Click me!</button>
        </div>
      </div>
    )
  }
}


export default DestinationSchoolSelection