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

    this.state = {pageNumber: 1}
  }

  submitRequest(IDs) {
    this.setState({pageNumber: 2})
  }


  renderAppPage() {
    if(this.state.pageNumber === 1) {
      return  <AgreementSelection 
                onSubmit={this.submitRequest.bind(this)}
              />
    } 
    else if(this.state.pageNumber === 2) {
      return <ClassSelector />
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
