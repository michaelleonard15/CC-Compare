

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
        if(list.length === 147) {
          return parseInitial(list)
        } 
        else {
          return parseSecondary(list)
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

export default Parse