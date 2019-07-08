import React from 'react'
import SpecificMajorSelection from './SpecificMajorSelection'


class DestinationSchoolSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {agreements: [{ID: 0, destination: -1, major: -1}]}
  }

  addAgreement = () => {
    let temp = this.state.agreements
    let lastIndex = temp.length - 1
    temp.push({ID: temp[lastIndex].ID + 1, destination: -1, major: -1})
    this.setState({agreements: temp})
  }

  generateMenus = () => {
    let menus = []
    let agreements = this.state.agreements
    for(let i = 0; i < agreements.length; i++) {
      menus.push(<SpecificMajorSelection   key={agreements[i].ID}
                                          listIndex={agreements[i].ID}
                                        destinationSchools={this.props.destinationSchools}
                                        removeAgreement={this.removeAgreement} />)
    }
    return menus
  }

  removeAgreement = (num) => {
      if(this.state.agreements.length > 1) {
      let newList = this.state.agreements.filter( (agreement) => {
          return num !== agreement.ID } )
      this.setState({agreements: newList})
    }
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