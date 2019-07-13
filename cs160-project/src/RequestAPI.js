

function RequestAPI() {

  let fetchInit = { method: 'GET', mode: 'cors' }

  function runFetch(request) {
    return  
      fetch(request , fetchInit).then( (response) => { 
        if(response.ok) {
          return response.json()
        }
      }).catch( (err) => console.log('Failed to open resourse: ' + err)) 
  }

  return {

    requestSources() {
      let request = 'http://127.0.0.1:5000/api/origin-schools'
      return runFetch(request) 
    },



    requestDestinations(SourceID) {
      let request = 'http://127.0.0.1:5000/api/dest-schools?origin=' + SourceID
      return runFetch(request)
    },



    requestMajors() {

    },



    requestAgreements() {

    },


  }
}


export default RequestAPI