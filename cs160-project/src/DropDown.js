import React from 'react'


//Props in the following format
// name="name of menu" 
// label="label for menu" 
// optionList={Array of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {selectedID: -1}
  }

  handleSelection = (event) => {
    if(event.target.value >= 0) {
      this.setState({selectedID: event.target.value})
      this.props.selectOption(event.target.value)
    }
  } 


  render() {
    return(
      <form>
        <label name={this.props.name}>{this.props.label}:</label>
        <br/>
        <select value={this.state.selectedID}
                name={this.props.name} 
                onChange={this.handleSelection} >

          <option key ="-1" value="-1">Choose from this list: </option> 
          
          {this.props.optionList.map((row) => {
              return(
                <option key={row.id} value={row.id}> {row.name} </option>
              )
            })
          }
          
        </select>
      </form>
    )
  }
}

export default DropDown;