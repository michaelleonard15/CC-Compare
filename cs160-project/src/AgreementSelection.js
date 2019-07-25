import React from 'react'
import DropDown from './DropDown'
import DestinationSchoolSelection from './DestinationSchoolSelection'
import RequestAPI from './RequestAPI'


/**
 * Top level component for the first 'page' of the application
 * Contains 
 *     Dropdown Menu for source school selection
 *     DestinationSchoolSelecection for selection of one 
 *          or more desitnation schools/majors
 *     Next button to submit request and load second page
 */
class AgreementSelection extends React.Component {


/**
 * Initializes the component state.
 * Contains arrays to for lists of source and destination schools
 *    and a Source School ID and array of objects with destination and
 *    major ids to be used when the submit button is clicked
 */
constructor(props) {
    super(props)

    this.state = {source: [], destinations: [], 
                  sourceID: -1, specificAgreements: []}
  }


  /**
   * After the component mounts runs and requests the list of
   * source schools. 
   */
  componentDidMount() {
    RequestAPI().requestSources().then( (schools) => {
      this.setState({source: schools})
    })
  }


  /**
   * Handler function passed to the source school
   * selection dropdown. Requests the list of possible destination
   * schools based on the ID of the source selected.
   */
  sourceSelected = (schoolID) => {
      RequestAPI().requestDestinations(schoolID).then( (schools) => {
      this.setState({destinations: schools, sourceID: schoolID})
    })
  }


  /**
   * Updates the list of specific agreements (combinations of
   * destination school and major) that have been selected.
   */
  specificAgreementSelected = (agreements) => {
    this.setState({specificAgreements: agreements})
  }


  /**
   * Sends an API request to the backend for the class 
   * equivalencies matrix, based on the SourceID and 
   * specific agreements selected. 
   */
  submitForm = () => {
    let request = {source: this.state.sourceID,
                   agreements: this.state.specificAgreements}
    console.log(request) 
    this.props.onSubmit(request)                  
  }


  /**
   * Renders the three child components
   * DropDown for source schools
   * DestinationSchoolSelection for destination and major selection
   * Button to submit the API request 
   */
  render () {
  return (
    <div>
      <div className="columns">
        <div className="column">  
          <div className="box has-background-light">
            <h4 className="title is-4">Origin School</h4>
            <div className="box has-background-primary">
              <DropDown 
                name="Schools" 
                label="Select your current school"
                optionList={this.state.source}
                currentSelection={this.state.sourceID}
                selectOption={this.sourceSelected}
              />
            </div>
          </div>
        </div>  
        <div className="column is-two-thirds">
          <DestinationSchoolSelection key={this.state.sourceID}
                                      destinationSchools={this.state.destinations} 
                                      specificAgreementSelected={this.specificAgreementSelected}
                                      sourceID={this.state.sourceID} />
        </div>
      </div>
        <div>
          <button className="button" onClick={this.submitForm}>Next</button>
        </div>
    </div>
    )
  }
}


export default AgreementSelection