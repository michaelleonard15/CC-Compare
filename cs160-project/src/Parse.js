

function Parse() {
  var temp = fetch('./institutions.json')
    .then( (response) => {
      if(response.ok) {
        console.log("request Success!")
        return response.json()
      }
      else {
        console.log("request failed")
      }
    })
    .then( (institutions) => {
        let list = []
        for(var i = 0; i < institutions.length; i++) {
          let inst = institutions[i]
          list.push({ id: inst.id, name: inst.names[0].name})
        }
        return list
    }) 
    console.log('EOF')
    return temp
}

export default Parse