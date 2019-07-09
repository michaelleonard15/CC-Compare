import React from 'react'
import SpecificMajorSelection from './SpecificMajorSelection'


class DestinationSchoolSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {agreements: [{ID: 0, destinationID: -1, majorID: -1}]}
  }

  addAgreement = () => {
    let temp = this.state.agreements
    let lastIndex = temp.length - 1
    temp.push({ID: temp[lastIndex].ID + 1, destinationID: -1, majorID: -1})
    this.setState({agreements: temp})
  }

  generateMenus = () => {
    let menus = []
    let agreements = this.state.agreements
    for(let i = 0; i < agreements.length; i++) {
      menus.push(<SpecificMajorSelection   key={agreements[i].ID}
                                          listIndex={agreements[i].ID}
                                        destinationSchools={this.props.destinationSchools}
                                        removeAgreement={this.removeAgreement} 
                                        updateIDs={this.updateIDs}  />)
    }
    return menus
  }

  removeAgreement = (num) => {
      if(this.state.agreements.length > 1) {
      let newList = this.state.agreements.filter( (agreement) => {
          return num !== agreement.ID } )
      this.setState({agreements: newList})
      this.submitAgreements(newList)
    }
  }

  updateIDs = (agreement) => {
    let temp = this.state.agreements
    for(let i = 0; i < temp.length; i++) {
      if(temp[i].ID === agreement.ID) {
        temp[i] = agreement
      }
    }
    this.setState({agreements: temp})
    this.submitAgreements(temp)
  }

  submitAgreements = (agreements) => {
    let list = agreements.map( (item) => {
      return({destinationID: item.destinationID, majorID: item.majorID})
    })
    console.log(list)
    this.props.specificAgreementSelected(list) 
  }

  render() {
    return (
      <div>
        <div>
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