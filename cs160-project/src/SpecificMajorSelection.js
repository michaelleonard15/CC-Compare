import React from 'react'
import DropDown from './DropDown'
import Parse from './Parse'


class SpecificMajorSelection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {majors: []}
  }


  handleSelected = (schoolId) => {
    if(schoolId === '39') {      
      Parse('majors.json').then( (majors) => 
        this.setState({majors: majors})
      )
    }
  }


  render() {
    return ( 
      <div align="center">
        <br/>
        <br/>
        <DropDown 
          name="Schools" 
          label="Select Transfer school"
          optionList={this.props.targetSchools}
          selectOption={this.handleSelected}
        />  
        <DropDown 
          name="Majors" 
          label="Select a Major for Transfer"
          optionList={this.state.majors}
          selectOption={() => {console.log("Do Stuff")}}
          />
        <button onClick={this.props.removeAgreement}>delete</button>  
      </div>
    )
  }
}


export default SpecificMajorSelection