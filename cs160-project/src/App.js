import React from 'react';
//import './App.css';
import DropDown from './DropDown'
import Parse from './Parse'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {source: [], target: []}
    Parse('institutions.json').then( (schools) => 
      this.setState({source: schools})
    )
  }

  handleSelected = (schoolId) => {
    Parse('agreements-' + schoolId + '.json').then( (schools) => 
      this.setState({target: schools})
    )
  }

  render () {
  return (
      <div className="App">
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select a school"
            optionList={this.state.source}
            selectOption={this.handleSelected}
          />  
        </div>
        <br/> <br/>
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select Transfer school"
            optionList={this.state.target}
          />  
        </div>
      </div>
    )
  }
}

export default App;
