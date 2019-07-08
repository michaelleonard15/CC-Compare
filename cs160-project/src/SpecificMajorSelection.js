import React from 'react'
import DropDown from './DropDown'
import Parse from './Parse'


class SpecificMajorSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {majors: [], destinationID: -1, majorID: -1}
  }


  destinationSelected = (schoolId) => {
    if(schoolId === '39') {      
      Parse('majors.json').then( (majors) => 
        this.setState({majors: majors,
            destinationID: schoolId})
      )
    }
  }

  majorSelected = (ID) => {
    this.setState({majorID: ID})
  }

  handleRemove = () => {
    console.log(this.props.listIndex)
    this.props.removeAgreement(this.props.listIndex)
  }

  render() {
    return ( 
      <div align="center">
        <br/>
        <br/>
        <DropDown 
          name="Schools" 
          label="Select Transfer school"
          optionList={this.props.destinationSchools}
          selectOption={this.destinationSelected}
        />  
        <DropDown 
          name="Majors" 
          label="Select a Major for Transfer"
          optionList={this.state.majors}
          selectOption={this.majorSelected}
          />
        <button onClick={this.handleRemove}>delete</button>  
      </div>
    )
  }
}

export default SpecificMajorSelection