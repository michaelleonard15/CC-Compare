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

    this.state = {pageNumber: 2}
  }

  submitRequest(IDs) {
    this.setState({pageNumber: 2})
  }

  dummyData() {
    return ['MATH 1A', 'MATH 1B', 'MATH 1C', 'MATH 2', 'MATH 4', 'MATH 5', 'MATH 15',
            'PHYS 40', 'PHYS 41', 'PHYS 42', 'PHYS 43', 'CS 10', 'CS 11', 'CS 12']
  }

  renderAppPage() {
    if(this.state.pageNumber === 1) {
      return  <AgreementSelection 
                onSubmit={this.submitRequest.bind(this)}
              />
    } 
    else if(this.state.pageNumber === 2) {
      return <ClassSelector 
                courses={this.dummyData()} />
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
