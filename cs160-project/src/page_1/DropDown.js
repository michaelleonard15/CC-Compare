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
    let ID = parseInt(event.target.value, 10)
    if(ID >= 0) {
      let name = ""
      this.props.optionList.forEach( (school) => {
        if(school.id === ID) { name = school.name }
      })
      this.props.selectOption(ID, name)
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

              <option 
                      key ="-1" 
                      value="-1">Select an option...</option> 
              
              {this.props.optionList.map((row, index) => {
                  return( <option 
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