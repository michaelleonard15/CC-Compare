

/**
 * Returns an object conatining functions to make API calls. 
 * Functions:
 *  requestSources()
 *  requestDestinations(int)
 *  requestMajors(int)
 *  requestAgreements()
 */
function RequestAPI() {

  let fetchInit = { method: 'GET', mode: 'cors' }


  /**
   * Handles the fetch request for the resource located at
   * 'request'
   */
  function runFetch(request) {
    return  fetch(request , fetchInit).then( (response) => { 
              if(response.ok) {
                return response.json()
              }
            }).catch( (err) => {
                console.log('Failed to open resourse: ' + err)
                return []
              }) 
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



    requestMajors(sourceID, destID) {

      console.info(`%c Major request: sourceID is ${sourceID} and destID is ${destID}`, 'color: purple; font-weight: bold;')
      let request = `http://127.0.0.1:5000/api/majors?origin=${sourceID}&dest=${destID}`
      return runFetch(request)
    },



    requestAgreements(IDs) {
      let majorIDs = IDs.agreements.map( (agr) => { return agr.major }) 

      console.log("Majors are: " + majorIDs)

      let request = `http://127.0.0.1:5000/api/agreements?num=${majorIDs.length}&`
      for(let i = 0; i < majorIDs.length; i++) {
        request += `id${i}=${majorIDs[i]}&`
      }
      request = request.slice(0, -1)

      console.log(request)

      return runFetch(request)


      //return fetch('./combined-out.json')
      //return fetch('./dummyClasses_7_29_v1.json')
      //.then( response => {
      //  return response.json()
      //})



    },


  }
}


export default RequestAPI