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

    this.state = {pageNumber: 1, lookupTable: [], requirements: []}
  }

  submitRequest(IDs) {
    fetch('./dummyClasses.json')
      .then( response => {
        return response.json()
      })
      .then( data => {
        let lookup = new Map()
        for(let i = 0; i < data.lookup.length; i++) {
          lookup.set(data.lookup[i].ID, {isSelected: data.lookup[i].isSelected,
                                         name: data.lookup[i].className})
        }
        this.setState({pageNumber: 2, lookupTable: lookup, requirements: data.requirements})
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
    let lookup = this.state.lookupTable
    let temp = lookup.get(index)
    temp.isSelected = !temp.isSelected
    lookup.set(index, temp)
    this.setState({lookupTable: lookup})
  }

  getClassList() {
    return Array.from(this.state.lookupTable.values())
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
                lookupTable={this.state.lookupTable}
                requirements={this.state.requirements}
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
