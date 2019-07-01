import React from 'react'


//Props in the following format
// name="name of menu" 
// label="label for menu" 
// optionList={Array of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {
 

  
 render() {
    return(
      <form>
        <label name={this.props.name}>{this.props.label}:</label>
        <br/>
        <select name={this.props.name}> 
          <DropDownOptions optionList={this.props.optionList} />
        </select>
      </form>
    )
  }

}


const DropDownOptions = (props) => {
  console.log(props.optionList + "options")
  const options = props.optionList.map((row) => {
    return(
      <option value={row.id}>
        {row.name}
      </option>
    )
  })
  return options
}



export default DropDown;