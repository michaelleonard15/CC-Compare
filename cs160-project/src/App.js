import React from 'react';
//import './App.css';
import DropDown from './DropDown'
import Parse from './Parse'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {source: [], target: []}
    Parse().then( (schools) => this.setState({source: schools})
    )
  }

     // const schools = Parse();
    //console.log(schools)
/*
      [
      {id: 1, name: "Santa Rosa Junior College"},
      {id: 2, name: "Sacramento State"},
      {id: 3, name: "CSU East Bay"},
      {id: 4, name: "CSU Northridge"},
      {id: 5, name: "Sonoma State Uinversity"},
      {id: 6, name: "UC Davis"},
      {id: 7, name: "San Jose State Univeristy"},
    ]
*/

  render () {
  return (
      <div className="App">
        <div align="center">  
          <DropDown 
            name="Schools" 
            label="Select a school"
            optionList={this.state.source}
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
