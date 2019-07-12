import json
import os
from urllib.request import urlopen

with open('agreement_ids.json') as f:
    data = json.load(f)

    for x in data:
        sourceId = x['id']
        tempList = list()
        for destId in x['agreementIds']:
            #while(source['reports'])
            with urlopen("https://assist.org/api/agreements?receivingInstitutionId="+str(destId)+"&sendingInstitutionId="+str(sourceId)+"&academicYearId=67&categoryCode=major") as response:
                source = response.read()
            readable_json = json.loads(source)
            for major in readable_json['reports']:
                tempReport = {
                    "label" : major['label'],
                    "key" : major['key']
                }
                tempList.append(tempReport)
            if(tempList.__len__()>0):
                with open(os.getcwd()+'/jsons/'+str(sourceId)+'_'+str(destId)+'.json', 'w') as f:   
                    json.dump(tempList, f, indent = 2)
        
        
#https://assist.org/api/agreements?receivingInstitutionId=39&sendingInstitutionId=113&academicYearId=67&categoryCode=major