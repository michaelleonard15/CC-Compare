import React from 'react'
import DropDown from './DropDown'
import SpecificMajorSelection from './SpecificMajorSelection'
import Parse from './Parse'


class AgreementSelection extends React.Component {

constructor(props) {
    super(props)

    this.state = {source: [], target: []}
    Parse('institutions.json').then( (schools) => 
      this.setState({source: schools})
    )
  }

  handleSelected = (schoolId) => {
    Parse('agreements-' + schoolId + '.json').then( (schools) => 
      this.setState({target: schools})
    )
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
          <SpecificMajorSelection targetSchools={this.state.target}/>
        </div>
        
      </div>
    )
  }
}


export default AgreementSelection