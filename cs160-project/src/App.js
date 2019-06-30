import React from 'react';
//import './App.css';
import DropDown from './DropDown'

function App() {
      const schools = [
      {id: 1, name: "Santa Rosa Junior College"},
      {id: 2, name: "Sacramento State"},
      {id: 3, name: "CSU East Bay"},
      {id: 4, name: "CSU Northridge"},
      {id: 5, name: "Sonoma State Uinversity"},
      {id: 6, name: "UC Davis"},
      {id: 7, name: "San Jose State Univeristy"},
    ]

  return (
    <div className="App">
      <div align="center">  
        <DropDown 
          name="Schools" 
          label="Select a school"
          optionList={schools}
        />  
      </div>
    </div>
  );
}

export default App;
