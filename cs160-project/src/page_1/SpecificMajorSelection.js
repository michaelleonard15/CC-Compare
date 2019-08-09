import React from 'react'
import DropDown from './DropDown'
import RequestAPI from './RequestAPI'


/**
 * Component to contain the two dropdown menus for
 * destination school and major selection. 
 * Props:
 * key="A unique identifier"
 * listIndex="Same identifier as key"
 * destinationSchools="Array of options in the format [{id:  name: }, {id: name: } ...]"
 * removeAgreement=handler for the delete button in this component
 * updateIDs=handler for when destination and majors have been selected
 */
class SpecificMajorSelection extends React.Component {

  /**
   * Initializes the state of the component.
   * Contains an array to hold a list of majors once
   * a destination school is selected. Also contains 
   * the ID of the destination school and major selected.
   */
  constructor(props) {
    super(props)
    this.state = {majorsList: [], destination: {ID: -1, name: ""}, 
                                  major: {ID: -1, name: ""} }
  }


  /**
   * Handler for the destination school dropdown
   * Requests the list of majors for the destination selected.
   */
  destinationSelected(destID, destName) {
      RequestAPI().requestMajors(this.props.sourceID, destID).then( (majorsList) => {
        this.setState({majorsList: majorsList, 
                       destination: {ID: destID, name: destName}, 
                       major: {ID: -1, name: ""} })
      })
  }


  /**
   * Handler for the major selection dropdown.
   * Sets the majorID and updates the agreements in 
   * the parent component.
   */
  majorSelected(majorID, majorName) {
    this.setState({major: {ID: majorID, name: majorName}})
    let specificAgreement = {destination: this.state.destination,
                             major: {ID: majorID, name: majorName}}
    this.props.updateIDs(this.props.listIndex ,specificAgreement)
  }


  /**
   * Renders the two dropdown menus for the component
   * and a button to remove the this component from 
   * the parent component.
   */
  render() {
    return (
      <div className="box has-background-grey-lighter">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="block">
              <DropDown
                name="Schools"
                label="Select transfer school"
                optionList={this.props.destinationSchools}
                currentSelection={this.state.destination.ID}
                selectOption={this.destinationSelected.bind(this)}/>
            </div>
            <div>
              <DropDown
                name="Majors"
                label="Select major"
                optionList={this.state.majorsList}
                currentSelection={this.state.major.ID}
                selectOption={this.majorSelected.bind(this)}/>
            </div>
          </div>
          <div className="column is-narrow">
            <button
              className="button is-dark"
              onClick={this.props.removeAgreement}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecificMajorSelection