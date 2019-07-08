import React from 'react'


//Props in the following format
// name="name of menu" 
// label="label for menu" 
// optionList={Array of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {
  
  handleSelection = (event) => {
    console.log(event)
    console.log(event.target)
    console.log(event.target.key)
    this.props.selectOption(event.target.value)
  } 


  render() {
    return(
      <form>
        <label name={this.props.name}>{this.props.label}:</label>
        <br/>
        <select name={this.props.name} onChange={this.handleSelection}> 
          <DropDownOptions optionList={this.props.optionList} />
        </select>
      </form>
    )
  }
}


const DropDownOptions = (props) => {
  const options = props.optionList.map((row) => {
    return(
      <option key={row.id} value={row.id}>
        {row.name}
      </option>
    )
  })
  return options
}



export default DropDown;