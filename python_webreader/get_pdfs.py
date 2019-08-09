import urllib.request
import os
import json
import datetime
testSchool = {
    "id": 113,
    "agreementIds": [
      7,
      11,
      12,
      21,
      23,
      24,
      26,
      29,
      39,
      42,
      46,
      50,
      60,
      75,
      76,
      79,
      81,
      85,
      88,
      89,
      98,
      115,
      116,
      117,
      120,
      128,
      129,
      132,
      141,
      143,
      144
    ]
  }
for x in testSchool['agreementIds']:
    if not os.path.exists(os.getcwd()+'/'+str(testSchool['id'])):
        os.makedirs(os.getcwd()+'/'+str(testSchool['id']))
        print('FOLDER CREATED!')
    with open(os.getcwd()+'/jsons/'+str(testSchool['id'])+'_'+str(x)+'.json',) as f: 
        readable_json = json.load(f) 
        print('====================NEW FILE STARTED SCHOOL: ',x,' =============================')
        print(datetime.datetime.now().time())
    for y in readable_json: 
        urllib.request.urlretrieve ('https://assist.org/api/artifacts/'+str(y['key']), os.getcwd()+'/'+str(testSchool['id'])+'/'+str(y['key'])+'.pdf')
