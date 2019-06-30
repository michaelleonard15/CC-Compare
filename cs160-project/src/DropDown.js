import React from 'react'

class DropDown extends React.Component {
  render() {
    return(
      <form>
        <label for="shools">Select a school:</label>
        <br/>  
        <select name="schools" autocomplete="true"> 
          <option value="SJSU">SJSU</option> 
          <option value="SRJC">SRJC</option> 
          <option value="SAC">SAC</option> 
          <option value="CSUEB">CSUEB</option> 
          <option value="CSUN">CSUN</option> 
          <option value="SSU">SSU</option> 
          <option value="UCD">UCD</option> 
        </select>
      </form>
    )
  }
}


export default DropDown;