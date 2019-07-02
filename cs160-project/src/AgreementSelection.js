import React from 'react'
import DropDown from './DropDown'
import SpecificMajorSelection from './SpecificMajorSelection'
import Parse from './Parse'


class AgreementSelection extends React.Component {

constructor(props) {
    super(props)

    this.state = {source: [], target: [], numAgreements: 1}
    Parse('institutions.json').then( (schools) => 
      this.setState({source: schools})
    )
  }

  handleSelected = (schoolId) => {
    Parse('agreements-' + schoolId + '.json').then( (schools) => 
      this.setState({target: schools})
    )
  }

  addAgreement = () => {
    let newNum = this.state.numAgreements + 1
    this.setState({numAgreements: newNum})
  }

  removeAgreement = () => {
    let newNum = this.state.numAgreements - 1
    if(newNum >= 1) {
      this.setState({numAgreements: newNum})
    }
  }

  render () {
  return (
      <div className="App">
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select a school"
            optionList={this.state.source}
            selectOption={this.handleSelected}
          />  
        </div>

        <br/>

        <div>
          <SpecificMajors numAgreements={this.state.numAgreements}
                          targetSchools={this.state.target} />
        </div>
        <div align="center">
          <button onClick={this.addAgreement}>Click me!</button>
        </div>
        
      </div>
    )
  }
}

const SpecificMajors = (props) => {
  const numAgreements = props.numAgreements
  let  agreements = []
  for (let i = 0; i < numAgreements; i++) {
    agreements.push(
      <div>
        <SpecificMajorSelection targetSchools={props.targetSchools} />
      </div>)
  }
  return agreements
}


export default AgreementSelection