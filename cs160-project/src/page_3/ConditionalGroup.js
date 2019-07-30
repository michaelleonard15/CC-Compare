import React from 'react'
import RowGroup from './RowGroup'
import RequirementRow from './RequirementRow'



class ConditionalGroup extends React.Component {
  
  //props: requirementSlice  


  generateRows() {
    return this.props.equivalencySlice.map( (row, index) => {
    return <label key={index}>[ {this.printCourses(row)} ]<br/></label>
    })
  }


  printCourses(row) {
    return row.map( (group, index) => {
      return <label key={index}>   {group.courses},   </label>
    }) 
  }


  render() {
    return (
      <div> 
        {this.generateRows()}
        <p>End of Group<br/><br/></p>
      </div>
    )
  }
}

export default ConditionalGroup