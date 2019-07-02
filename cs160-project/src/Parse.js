

function Parse(fileName) {

  console.log(fileName)

  var temp = fetch('./' + fileName)
    .then( (response) => {
      if(response.ok) {
        console.log("request Success!")
        return response.json()
      }
      else {
        console.log("request failed")
      }
    })
    .then( (list) => {
        if(fileName === 'institutions.json') {
          return parseInitial(list)
        } 
        else if (fileName === 'agreements-57.json'){
          return parseSecondary(list)
        }
        else if (fileName === 'majors.json') {
          return parseMajors(list.reports)
        }

        
    }) 
    return temp
}


function parseInitial(list) {
  let temp = []
  for(var i = 0; i < list.length; i++) {
    let inst = list[i]
    temp.push({ id: inst.id, name: inst.names[0].name})
  }
  return temp
}


function parseSecondary(list) {
  let temp = []
  for(var i = 0; i < list.length; i++) {
    let inst = list[i]
    temp.push({ id: inst.institutionParentId, name: inst.institutionName})
  }
  return temp
}


function parseMajors(list) {
  let temp = []
  for(var i = 0; i < list.length; i++) {
    let inst = list[i]
    temp.push({ id: inst.key, name: inst.label})
  }
  return temp
}

export default Parse