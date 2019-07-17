

function Parse(fileName) {

  return fetch('./' + fileName)
    .then( (response) => {
      if(response.ok) {
        console.log(response)
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
    }).catch( err => { console.log(err); return []} )
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
    if(temp.length === 0) {
      temp.push({ id: inst.institutionParentId, name: inst.institutionName})
    }
    else if(inst.institutionParentId !== temp[temp.length - 1].id) {
      temp.push({ id: inst.institutionParentId, name: inst.institutionName})
    } 
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