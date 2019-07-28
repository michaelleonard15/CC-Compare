import React from 'react'
import SpecificMajorSelection from './SpecificMajorSelection'


/**
 * Component to contain and manage SpecificMajorSelection
 * components. Keeps an array to represent the indivitual components
 * with unique keys.
 * Props:
 * destinationSchools="Array of options in the format [{id:  name: }, {id: name: } ...]"
 * specificAgreementSelected=Handler for each time an agreement (destination/major) 
 *          combination is selected.
 */
class DestinationSchoolSelection extends React.Component {

  /**
   * Initializes component state with the first agreement. 
   */
  constructor(props) {
    super(props)

    this.state = {agreements: [{ID: 0, destinationID: -1, majorID: -1}]}
  }


  /**
   * Adds an agreement to the array in the state. 
   * Assigns a unique key, and gives default values for the 
   * selected destination and major IDs
   */
  addAgreement = () => {
    let temp = this.state.agreements.slice()
    if(temp.length < 5) {
      let lastIndex = temp.length - 1
      temp.push({ID: temp[lastIndex].ID + 1, destinationID: -1, majorID: -1})
      this.setState({agreements: temp})
    }
  }


  /**
   * Removes the array stored at agreements[index]. 
   * Does nothing if there is only one agreement stored 
   * in the array.
   */
  removeAgreement = (index) => {
    let newList = this.state.agreements.slice()
    if(newList.length > 1) {
      newList.splice(index, 1)
      this.setState({agreements: newList})
      this.submitAgreements(newList)
    }
  }


  /**
   * Updates an agreements[index] with a new agreement
   * containing a destinationID and major ID
   */
  updateIDs = (index, agreement) => {
    let temp = this.state.agreements.slice()
    temp[index] = agreement
    this.setState({agreements: temp})
    this.submitAgreements(temp)
  }


  /**
   * Removes the unique keys from the objects in the 
   * agreements array and sends the array to the 
   * parent component
   */
  submitAgreements = (agreements) => {
    let list = agreements.map( (item) => {
      return({destinationID: item.destinationID, majorID: item.majorID})
    })
    this.props.specificAgreementSelected(list) 
  }



  /**
   * Renders the SpecificMajorSelection components
   * and a button to add additional components
   */
  render() {
    return (
      <div className="">
        <div className="box has-background-light">
          <h4 className="title is-4">Destination Schools</h4>
          {this.state.agreements.map((agreement, index) => {
            return (
              <SpecificMajorSelection
                key={agreement.ID}
                listIndex={agreement.ID}
                destinationSchools={this.props.destinationSchools}
                removeAgreement={this.removeAgreement.bind(this, index)}
                updateIDs={this.updateIDs.bind(this, index)}
                sourceID={this.props.sourceID}
              />
            );
          })}
          <div className="level-right">
            <button
              className="button level-item is-primary"
              onClick={this.addAgreement}
            >
              Add another school
            </button>
          </div>
        </div>
      </div>
    );
  }
}


export default DestinationSchoolSelection