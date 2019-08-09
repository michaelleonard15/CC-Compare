




function evaluation(lookupTable) {
  
  let lookup = lookupTable


  /**
   * Given a set of IDs and relationships, checks if a
   * requirement has been satisfied by checking the isSelected of
   * each ID and building a boolean expression with the resulting 
   * true/false values and the relationships. 
   * Returns true or false
   */
  function handleConditionalRequirements(courses) {   
    let result_OR = false
    for(let or  = 0; or < courses.length; or++) {
      let result_AND = true
      for(let and  = 0; and < courses[or].length; and++) {
        result_AND = result_AND && lookup.get(courses[or][and]).isSelected
      }
      result_OR = result_OR || result_AND 
    }
    return result_OR
  }






  function groupRows(slice) {
    let groups = []

    for(let i = 0; i < slice.length; i++) {
      let temp = [slice[i]]
      if("relationToNext" in slice[i][0]) {
        while("relationToNext" in slice[i][0] && i < slice.length) {
          temp.push(slice[ i + 1 ])
          i += 1
        }
      }
      groups.push(temp)
    }
    return groups
  }



  function countCompleted(total, group) {
    let targetCol = 0;
    let row = group[0]
    for(let i = 1; i < row.length; i++) {
      if(row[i].courses.length > 0) { targetCol = i }
    }

    group.forEach ( (row) => {
      let courses = row[targetCol].courses
      for(let i = 0; i < courses.length; i++) {
        for(let j = 0; j < courses[i].length; j++) {
          total.courses += 1
          total.units += lookup.get(courses[i][j]).units
        }
      }
    })
    return total
  }

      


  return {

    conditionalGroup(slice, condition) {
      let totals = {courses: 0, units: 0}  

      let groups = groupRows(slice)

      groups.forEach( (group) => {
        if(this.rowGroup(group)) {
            totals = countCompleted(totals, group)
        }
      })




/*
      for(let row = 0; row < slice.length; row++) {
        let courses = slice[row][0].courses
        for(let i = 0; i < courses.length; i++) {
          for(let j = 0; j < courses[i].length; j++) {
            let course = lookup.get(courses[i][j])
            if (condition.type === "COURSES") {
              tot += course.isSelected ? 1 : 0
            }
            else if (condition.type === "UNITS") {
              tot += course.isSelected ? course.units : 0
            }
          }
        }
      }*/
      let finalTotal = condition.type === "UNITS" ? totals.units : totals.courses 
      return finalTotal >= condition.number
    },





    /**
     * Function to check if all of the requirements for this 
     * group of rows have been satisfied. Checks for completion of requirements
     * in each child row, and then evaluates the group of rows based on the relationship
     * defined in the equivalencySlice prop
     * Returns true or false
     */
    rowGroup(slice) {

      let boolArray = slice.map( (row) => {
        return this.row(row)
      })    

      let expr = boolArray[0]

      for(let i = 0; i < boolArray.length - 1; i++) {
        let row = slice[i]
        let operator = row[0].relationToNext === "OR" ? "||" : "&&"
        expr += operator + boolArray[i +1]
      }

      return eval(expr)
    },




    /**
     * Checks an individual row to see if the requirements have been 
     * satisfied. For a single requirement, returns the value of isSelected 
     * from the lookupArray. For multiple requirements, calls a helper function.
     * Returns true or false
     */
    row(row) {
      let courses = row[0].courses
      if( (courses.length === 1) && (courses[0].length === 1) ) {
        return lookup.get(courses[0][0]).isSelected
      }
      else {
        return handleConditionalRequirements(courses)
      }
    },

  }
  
}

export default evaluation