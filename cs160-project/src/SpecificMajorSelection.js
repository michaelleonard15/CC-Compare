import React from 'react'
import DropDown from './DropDown'
import RequestAPI from './RequestAPI'
import './App.css';


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
    this.state = {majors: [], destinationID: -1, majorID: -1}
  }


  /**
   * Handler for the destination school dropdown
   * Requests the list of majors for the destination selected.
   */
  destinationSelected = (schoolID) => {
    //if(schoolID === '39') {
      RequestAPI().requestMajors(schoolID).then( (majors) => {
        this.setState({majors: majors, destinationID: schoolID, majorID: -1})
      })
    //}
  }


  /**
   * Handler for the major selection dropdown.
   * Sets the majorID and updates the agreements in 
   * the parent component.
   */
  majorSelected = (ID) => {
    this.setState({majorID: ID})
    let specificAgreement = {ID: this.props.listIndex, 
                             destinationID: this.state.destinationID,
                             majorID: ID}
    this.props.updateIDs(specificAgreement)
  }


  /**
   * Renders the two dropdown menus for the component
   * and a button to remove the this component from 
   * the parent component.
   */
  render() {
    return ( 
      <div className="specific_major_selection">
        <DropDown 
          name="Schools" 
          label="Select Transfer school"
          optionList={this.props.destinationSchools}
          currentSelection={this.state.destinationID}
          selectOption={this.destinationSelected}
        />  
        <DropDown 
          name="Majors" 
          label="Select a Major for Transfer"
          optionList={this.state.majors}
          currentSelection={this.state.majorID}
          selectOption={this.majorSelected}
          />
        <button 
            className="specific_major_selection_remove"
            onClick={this.props.removeAgreement}>
              delete
        </button>  
      </div>
    )
  }
}

export default SpecificMajorSelection