import React from 'react'
import DropDown from './DropDown'


class AgreementSelection extends React.Component {



  render() {
    return ( 
      <div>
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select Transfer school"
            optionList={[]}
          />  
        </div>
      
        <div align="center">  
          <DropDown 
            name="Majors" 
            label="Select a Major for Transfer"
            optionList={[]}
          />  
        </div>
      </div>
    )
  }
}


export default AgreementSelection