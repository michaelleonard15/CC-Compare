import React from 'react'
import DropDown from './DropDown'
import Parse from './Parse'


class SpecificMajorSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {majors: []}
  }

  updateStateFromParent

  handleSelected = (schoolId) => {
    if(schoolId === '39') {      
      Parse('majors.json').then( (majors) => 
        this.setState({majors: majors})
      )
    }
  }


  render() {
    return ( 
      <div>
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select Transfer school"
            optionList={this.props.targetSchools}
            selectOption={this.handleSelected}
          />  
        </div>
      
        <div align="center">  
          <DropDown 
            name="Majors" 
            label="Select a Major for Transfer"
            optionList={this.state.majors}
          />  
        </div>
      </div>
    )
  }
}


export default SpecificMajorSelection