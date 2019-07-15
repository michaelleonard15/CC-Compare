import React from 'react';
import './App.css';
import AgreementSelection from './AgreementSelection'
import ClassSelector from './ClassSelector'


/**
 * Top level component for the frontend
 * Depending the pageNumber state, renders one of
 * the three page components for this app.
 */
class App extends React.Component {
  

  constructor(props) {
    super(props)

    this.state = {pageNumber: 1, courseMatrix: []}
  }

  



  submitRequest(IDs) {
    fetch('./dummyClasses.json')
      .then( response => {
        return response.json()
      })
      .then( matrix => {
        this.setState({pageNumber: 2, courseMatrix: matrix})
      })
      .catch( err => {console.log(err)} )
  }



  handleBackButton() {
    let page = this.state.pageNumber
    if(page > 1) {
      this.setState({pageNumber: page - 1})
    }
  }

//  dummyData() {
//    return ['MATH 1A', 'MATH 1B', 'MATH 1C', 'MATH 2', 'MATH 4', 'MATH 5', 'MATH 15',
//            'PHYS 40', 'PHYS 41', 'PHYS 42', 'PHYS 43', 'CS 10', 'CS 11', 'CS 12']
//  }

  getClassList() {
    return this.state.courseMatrix.map( row => {return row[1]})
  }

  renderAppPage() {
    if(this.state.pageNumber === 1) {
      return  <AgreementSelection 
                onSubmit={this.submitRequest.bind(this)}
              />
    } 
    else if(this.state.pageNumber === 2) {
      return <ClassSelector 
                courses={this.getClassList()}
                backButton={this.handleBackButton.bind(this)} />
    }
  }

  render () {
    return (
      <div>
        {this.renderAppPage()}
      </div>
    )
  }
}

export default App;
