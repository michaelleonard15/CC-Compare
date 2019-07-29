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
    let map = new Map().set(0, null)
    this.state = {agreements: map}
  }


  /**
   * Adds an agreement to the array in the state. 
   * Assigns a unique key, and gives default values for the 
   * selected destination and major IDs
   */
  addAgreement() {
    let map = this.state.agreements
    if(map.size < 5) {
      let key = this.getRandomInt(100)
      while(map.has(key)) { key = this.getRandomInt(100) }
      map.set(key, null)
      this.setState({agreements: map})
    }
  }




  getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }



  /**
   * Removes the array stored at agreements[index]. 
   * Does nothing if there is only one agreement stored 
   * in the array.
   */
  removeAgreement(key) {
    let map = this.state.agreements
    if(map.size > 1) {
      map.delete(key)
      this.setState({agreements: map})
      this.props.updateAgreements(map.values())
    }
  }


  /**
   * Updates an agreements[index] with a new agreement
   * containing a destinationID and major ID
   */
  updateIDs(key, agreement) {
    let map = this.state.agreements    
    this.setState({agreements: map.set(key, agreement)})
    this.props.updateAgreements(map.values())
  }
  

  /**
   * Removes the unique keys from the objects in the 
   * agreements array and sends the array to the 
   * parent component
   */
  /*submitAgreements(agreements) {
    let list = agreements.map( (item) => {
      return({destinationID: item.destinationID, majorID: item.majorID})
    })
    this.props.specificAgreementSelected(list) 
  }*/


  generateSlectionMenus() {
    let IDs = Array.from(this.state.agreements.keys())
    return IDs.map( (ID) => { 
      return (
        <SpecificMajorSelection
          key={ID}
          listIndex={ID}
          destinationSchools={this.props.destinationSchools}
          removeAgreement={this.removeAgreement.bind(this, ID)}
          updateIDs={this.updateIDs.bind(this)}
          sourceID={this.props.sourceID}
        />
      )
    })
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
          {this.generateSlectionMenus()}
          <div className="level-right">
            <button
              className="button level-item is-primary"
              onClick={this.addAgreement.bind(this)}
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
