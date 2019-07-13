import React from 'react'
import DropDown from './DropDown'
import DestinationSchoolSelection from './DestinationSchoolSelection'
import Parse from './Parse'
import RequestAPI from './RequestAPI'


class AgreementSelection extends React.Component {

constructor(props) {
    super(props)

    this.state = {source: [], destinations: [], 
                  sourceID: -1, specificAgreements: []}
  }



  componentDidMount() {
    RequestAPI().requestSources().then( (schools) => {
      this.setState({source: schools})
    })
  }



  sourceSelected = (schoolID) => {
      RequestAPI().requestDestinations(schoolID).then( (schools) => {
      this.setState({destinations: schools})
    })
  }



  specificAgreementSelected = (agreements) => {
    this.setState({specificAgreements: agreements})
  }



  submitForm = () => {
    let request = {source: this.state.sourceID,
                   agreements: this.state.specificAgreements}
    console.log(request)                   
  }


 
  render () {
  return (
      <div>
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select a school"
            optionList={this.state.source}
            selectOption={this.sourceSelected}
          />
        </div>  
          <DestinationSchoolSelection destinationSchools={this.state.destinations} 
                                      specificAgreementSelected={this.specificAgreementSelected} />
        <div align="center">  <br/><br/> 
          <button onClick={this.submitForm}>Next</button>
        </div>
      </div>
    )
  }
}


export default AgreementSelection