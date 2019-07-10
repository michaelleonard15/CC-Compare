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



  removeAgreement = (index) => {
    if(this.state.agreements.length > 1) {
      let newList = this.state.agreements
      newList.splice(index, 1)
      this.setState({agreements: newList})
      this.submitAgreements(newList)
    }
  }

  updateIDs = (index, agreement) => {
    let temp = this.state.agreements
    temp[index] = agreement
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
          {this.state.agreements.map( (agreement, index) => {
            return(
              <SpecificMajorSelection   
                key={index}
                listIndex={agreement.ID}
                destinationSchools={this.props.destinationSchools}
                removeAgreement={this.removeAgreement.bind(this, index)} 
                updateIDs={this.updateIDs.bind(this, index)}  />
              )
            })
          }
        </div>
        <div align="center">
          <button onClick={this.addAgreement}>Click me!</button>
        </div>
      </div>
    )
  }
}


export default DestinationSchoolSelection