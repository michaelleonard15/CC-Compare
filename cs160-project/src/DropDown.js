import React from 'react'

//Props in the following format
// name="name of menu" 
// label="label for menu" 
// optionList={Array of options}
// Options array in the format [{id:  name: }, {id: name: } ...]
class DropDown extends React.Component {

  /**
   * Handler for selection of a menu item
   * For valid menu values (>= 0) sets the 
   * state and passes the menu value selected to the 
   * parent component.
   */
  handleSelection = (event) => {
    if(event.target.value >= 0) {
      this.props.selectOption(event.target.value)
    }
  } 


  /**
   * Renders the <select> element with a default option
   * and the prop optionList mapped to the other <option> elements.
   */
  render() {
    return(
      <div>
        <form>

          <label className="label" name={this.props.name}>
            {this.props.label}:
          </label>

          <div className="select">
            <select value={this.props.currentSelection}
                    name={this.props.name} 
                    onChange={this.handleSelection} >

              <option className="dropdown_menu_option_2"
                      key ="-1" 
                      value="-1">Select an option...</option> 
              
              {this.props.optionList.map((row, index) => {
                  return( <option className={"dropdown_menu_option_" + (index % 2 + 1)}
                            key={row.id} 
                            value={row.id}>{row.name}</option> )
                })
              }
            </select>
          </div>

        </form>
      </div>
    )
  }
}

export default DropDown;