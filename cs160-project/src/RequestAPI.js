

function RequestAPI() {

  let init = { method: 'GET', mode: 'cors' }

  return {

    requestSources() {
      let request = 'http://127.0.0.1:5000/api/origin-schools'
      return  fetch(request, init).then( (response) => { 
                if(response.ok) {
                  console.log(response)
                  return response.json()
                }
              }).catch( (err) => 
                  console.log('Failed to open resourse: ' + err))  
    },

    requestDestinations(SourceID) {
      let request = 'http://127.0.0.1:5000/api/dest-schools?origin=' + SourceID
      return  fetch(request , init).then( (response) => { 
                if(response.ok) {
                  console.log(response)
                  return response.json()
                }
              }).catch( (err) => 
                  console.log('Failed to open resourse: ' + err)) 
    },

    requestMajors() {

    },

  }
}


export default RequestAPI