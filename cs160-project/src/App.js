import React from 'react';
// import 'bulma/css/bulma.css'
import './mystyles.scss'
import './App.css'
import AgreementSelectionPage from './page_1/AgreementSelectionPage'
import CourseSelectorPage from './page_2/CourseSelectorPage'
import FinalReportPage from './page_3/FinalReportPage'


/**
 * Top level component for the frontend
 * Depending the pageNumber state, renders one of
 * the three page components for this app.
 */
class App extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {pageNumber: 1, lookupTable: [], equivalencyMatrix: [], schoolList: [],
                  agreementKeys: [] }
  }



  /**
   * Handler for the submit button on the first page of the application
   * Uses RequestAPI to send a GET request to the backend with the
   * source, destination and agreement IDs. Places the response in 
   * the lookupTabel and equivalencyMatrix state variables. Changes
   * the pageNumber state to load the second page. 
   */
  submitRequest(IDs, names) {
    this.setState({schoolList: names, 
                   agreementKeys: IDs.agreements.map( (arg) => {return arg.major})
    })

    fetch('./dummyClasses_7_27_v2.json')
      .then( response => {
        return response.json()
      })
      .then( data => {
        let lookup = new Map()
        for(let i = 0; i < data.lookup.length; i++) {
          lookup.set(data.lookup[i].ID, data.lookup[i].course)
        }
        this.setState({pageNumber: 2, lookupTable: lookup, equivalencyMatrix: data.equivalencyMatrix})
      })
      .catch( err => {console.log(err)} )
  }




  /**
   * Handler for the next button on the second page. Sets the 
   * pageNumber state to load the third page.
   */
  loadPageThree() {
    this.setState({pageNumber: 3})
  }



  /**
   * Handler for the back button on pages 2 and 3 of the application.
   * decrements the pageNumber state to load the appropriate page.
   */
  handleBackButton() {
    let page = this.state.pageNumber
    if(page > 1) {
      this.setState({pageNumber: page - 1})
    }
  }


  /**
   * onClick handler to toggle the isSelected property of objects in the 
   * lookupTabel. Used by buttons on page 2 and page 3.
   */
  handleToggle(index) {
    let lookup = this.state.lookupTable

    let temp = lookup.get(index)
    temp.isSelected = !temp.isSelected
    lookup.set(index, temp)
    
    this.setState({lookupTable: lookup})
  }





  /**
   * Returns an AgreementSelection, ClassSelector, or FinalReport
   * component depending on the current value of the pageNumber state.
   * Used to contitionally render the correct application page. 
   */
  renderAppPage() {
    if(this.state.pageNumber === 1) { 
      return  <AgreementSelectionPage 
                onSubmit={this.submitRequest.bind(this)}
              />
    } 
    else if(this.state.pageNumber === 2) {
      return  <CourseSelectorPage 
                lookupTable={this.state.lookupTable}
                handleToggle={this.handleToggle.bind(this)}
                backButton={this.handleBackButton.bind(this)}
                loadNextPage={this.loadPageThree.bind(this)}
                schoolName={this.state.schoolList[0]}
              />
    }
    else if(this.state.pageNumber === 3) {
      return <FinalReportPage 
                lookupTable={this.state.lookupTable}
                equivalencyMatrix={this.state.equivalencyMatrix}
                handleToggle={this.handleToggle.bind(this)}
                backButton={this.handleBackButton.bind(this)}
                schoolList={this.state.schoolList}
                agreementKeys={this.state.agreementKeys} />
    }
  }


  /**
   * Render function for the component, calls renderAppPage() to 
   * get the correct component to load for the current application state. 
   */
  render () {
    return (
      <div className="Site">
        
        <div className="Site-content">
          <div className="container">
            {this.renderAppPage()}
          </div>
        </div>

        <footer className="footer">
          <div className="content has-text-centered">
          
          </div>
          
        </footer>
      
      </div>
      )
  }
}

export default App;
