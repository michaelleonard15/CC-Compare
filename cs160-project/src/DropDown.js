import React from 'react'
import './App.css'

//Props in the following format
// name="name of menu" 
// label="label for menu" 
// optionList={Array of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {
  
  /**
   * Initializes the state for the component
   */
  constructor(props) {
    super(props)

    this.state = {selectedID: -1}
  }


  /**
   * Handler for selection of a menu item
   * For valid menu values (>= 0) sets the 
   * state and passes the menu value selected to the 
   * parent component.
   */
  handleSelection = (event) => {
    if(event.target.value >= 0) {
      this.setState({selectedID: event.target.value})
      this.props.selectOption(event.target.value)
    }
  } 


  /**
   * Renders the <select> element with a default option
   * and the prop optionList mapped to the other <option> elements.
   */
  render() {
    return(
      <div className="dropdown_menu_box">
        <form>
          <label className="dropdown_menu_label"
                 name={this.props.name}>{this.props.label}:</label>
          <br/>
          <select className="dropdown_menu_closed"
                  value={this.state.selectedID}
                  name={this.props.name} 
                  onChange={this.handleSelection} >

            <option className="dropdown_menu_option_2"
                    key ="-1" 
                    value="-1">Choose from this list: </option> 
            
            {this.props.optionList.map((row, index) => {
                return(
                  <option className={"dropdown_menu_option_" + (index % 2 + 1)}
                          key={row.id} 
                          value={row.id}> {row.name} </option>
                )
              })
            }
          </select>
        </form>
      </div>
    )
  }
}

export default DropDown;