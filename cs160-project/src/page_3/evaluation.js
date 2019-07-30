




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

  return {
    /**
     * Function to check if all of the requirements for this 
     * group of rows have been satisfied. Checks for completion of requirements
     * in each child row, and then evaluates the group of rows based on the relationship
     * defined in the equivalencySlice prop
     * Returns true or false
     */
    group(slice) {

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