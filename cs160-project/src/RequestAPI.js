//For testing menus
import Parse from './Parse'
///////////////////


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
            }).catch( (err) => 
                console.log('Failed to open resourse: ' + err)) 
  }

  return {

    requestSources() {
      let request = 'http://127.0.0.1:5000/api/origin-schools'
      return runFetch(request)

      // FOR TESTING ////
      // return Parse('institutions.json')
      /////////////////// 
    },



    requestDestinations(SourceID) {
      let request = 'http://127.0.0.1:5000/api/dest-schools?origin=' + SourceID
      return runFetch(request)
      
      // FOR TESTING ////
      // return Parse('agreements-' + SourceID + '.json')    
      /////////////////// 
    },



    requestMajors(sourceID, destID) {

      let request = `http://127.0.0.1:5000/api/majors?origin=${sourceID}&dest=${destID}`
      return runFetch(request)

      // FOR TESTING ////
      // return Parse('majors.json') 
      ///////////////////
    },



    requestAgreements() {

    },


  }
}


export default RequestAPI