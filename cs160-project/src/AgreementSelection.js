import React from 'react'
import DropDown from './DropDown'
import DestinationSchoolSelection from './DestinationSchoolSelection'
import Parse from './Parse'


class AgreementSelection extends React.Component {

constructor(props) {
    super(props)

    this.state = {source: [], destinations: [], 
                  sourceID: -1, specificAgreements: []}


    Parse('institutions.json').then( (schools) => 
      this.setState({source: schools})
    )
  }


  sourceSelected = (schoolId) => {
    Parse('agreements-' + schoolId + '.json').then( (schools) => 
      this.setState({destinations: schools, sourceID: schoolId})
    )
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