import React from 'react'
import DropDown from './DropDown'
import DestinationSchoolSelection from './DestinationSchoolSelection'
import Parse from './Parse'


class AgreementSelection extends React.Component {

constructor(props) {
    super(props)

    this.state = {source: [], destinations: []}
    Parse('institutions.json').then( (schools) => 
      this.setState({source: schools})
    )
  }


  handleSelected = (schoolId) => {
    Parse('agreements-' + schoolId + '.json').then( (schools) => 
      this.setState({destinations: schools})
    )
  }

 
  render () {
  return (
      <div>
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select a school"
            optionList={this.state.source}
            selectOption={this.handleSelected}
          />
        </div>  
        <div>
          <DestinationSchoolSelection destinationSchools={this.state.destinations} />
        </div>
        
      </div>
    )
  }
}


export default AgreementSelection