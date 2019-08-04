import urllib.request
import os
import json
import datetime

with open(os.getcwd()+'/agreement_ids.json') as filetemp: 
        schools = json.load(filetemp) 
for testSchool in schools:        
  for x in testSchool['agreementIds']:
      if not os.path.exists(os.getcwd()+'/pdfs'):
          os.makedirs(os.getcwd()+'/pdfs')
          print('FOLDER CREATED!')
      with open(os.getcwd()+'/jsons/'+str(testSchool['id'])+'_'+str(x)+'.json',) as f: 
          readable_json = json.load(f) 
          print('====================NEW FILE STARTED SCHOOL: ',x,' =============================')
          print(datetime.datetime.now().time())
      for y in readable_json: 
          urllib.request.urlretrieve ('https://assist.org/api/artifacts/'+str(y['key']), os.getcwd()+'/pdfs'+'/'+str(y['key'])+'.pdf')