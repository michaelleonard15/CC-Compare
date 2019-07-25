import React from 'react';
import './App.css';
import AgreementSelection from './AgreementSelection'
import ClassSelector from './ClassSelector'
import FinalReport from './FinalReport'


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

  loadPageThree() {
    this.setState({pageNumber: 3})
  }

  handleBackButton() {
    let page = this.state.pageNumber
    if(page > 1) {
      this.setState({pageNumber: page - 1})
    }
  }


  handleToggle(index) {
    let temp = this.state.courseMatrix.slice()
    temp[index][0] = !temp[index][0]
    this.setState({courseMatrix: temp})
  }

  getClassList() {
    return this.state.courseMatrix.map( row => {
      return {selected: row[0], name: row[1]}
    })
  }

  renderAppPage() {
    if(this.state.pageNumber === 1) {
      return  <AgreementSelection 
                onSubmit={this.submitRequest.bind(this)}
              />
    } 
    else if(this.state.pageNumber === 2) {
      return  <ClassSelector 
                courses={this.getClassList()}
                handleToggle={this.handleToggle.bind(this)}
                backButton={this.handleBackButton.bind(this)}
                loadNextPage={this.loadPageThree.bind(this)}
              />
    }
    else if(this.state.pageNumber === 3) {
      return <FinalReport 
                courseMatrix={this.state.courseMatrix}
                handleToggle={this.handleToggle.bind(this)}
                backButton={this.handleBackButton.bind(this)} />
    }
  }

  render () {
    return (
      <div className="APP">
        {this.renderAppPage()}
      </div>
    )
  }
}

export default App;
