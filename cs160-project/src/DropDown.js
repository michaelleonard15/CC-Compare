import React from 'react'


//Props in the following format
// {name of menu, Label for menu, arry of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {
  
 render() {
    return(
      <form>
        <label for={this.props.name}>{this.props.label}:</label>
        <br/>
        <select name={this.props.name}> 
          <DropDownOptions optionList={this.props.optionList} />
        </select>
      </form>
    )
  }

}


const DropDownOptions = (props) => {
  const options = props.optionList.map((row, index) => {
    return(
      <option key={index} value={row.id}>
        {row.name}
      </option>
    )
  })
  return options
}



export default DropDown;