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
class AgreementSelectionPage extends React.Component {


/**
 * Initializes the component state.
 * Contains arrays to for lists of source and destination schools
 *    and a Source School ID and array of objects with destination and
 *    major ids to be used when the submit button is clicked
 */
constructor(props) {
    super(props)

    this.state = {source: [], destinations: [], 
                  selectedSource: {ID: -1, name: ""}, specificAgreements: []}
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
  sourceSelected(schoolID, schoolName) {
      RequestAPI().requestDestinations(schoolID).then( (schools) => {
      this.setState({destinations: schools, 
                     selectedSource: {ID: schoolID, name: schoolName}
      })
    })
  }

  /**
   * Updates the list of specific agreements (combinations of
   * destination school and major) that have been selected.
   */
  updateAgreements(agreements) {
    this.setState({specificAgreements: agreements})
  }


  /**
   * Sends an API request to the backend for the class 
   * equivalencies matrix, based on the SourceID and 
   * specific agreements selected. 
   */
  submitForm() {
    let names = [this.state.selectedSource.name]
    let IDs = []
    let agreements = Array.from(this.state.specificAgreements)

    for(let i = 0; i < agreements.length; i++) {
      names.push(agreements[i].destination.name)
      IDs.push({destination: agreements[i].destination.ID, 
                major: agreements[i].major.ID})
    }

    let request = {source: this.state.selectedSource.ID, agreements: IDs}

    ///// REMOVE THIS LINE LATER
    if(names[0] === "") { names = ["Dummy 1","Dummy 2","Dummy 3","Dummy 4"]}
    ///// REMOVE THIS LINE LATER

    this.props.onSubmit(request, names)                  
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
      <h1 className="title is-1">College Comparison Tool</h1>

      <div className="box">
        <div className="columns">

          <div className="column is-narrow">
            <div className="box has-background-light">
              <h4 className="title is-4">Origin School</h4>
              <div className="box has-background-grey-lighter">
                <DropDown
                  name="Schools"
                  label="Select your current school"
                  optionList={this.state.source}
                  currentSelection={this.state.selectedSource.ID}
                  selectOption={this.sourceSelected.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="column">
            <DestinationSchoolSelection
              destinationSchools={this.state.destinations}
              updateAgreements={this.updateAgreements.bind(this)}
              sourceID={this.state.selectedSource.ID}
            />
          </div>

        </div>

        <div className="level-right">
          <button
            className="button is-large  level-item"
            onClick={this.submitForm.bind(this)}>Next</button>
        </div>
      </div>
    </div>
  );
  }
}


export default AgreementSelectionPage