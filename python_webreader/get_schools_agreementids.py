import json
from urllib.request import urlopen # using the urllib built in module, we are importing urlopen
from collections import namedtuple

with urlopen("https://assist.org/api/institutions") as response:
    source = response.read()
    # setting source variable as response upon which read is being called, not very readable

readable_json = json.loads(source)
#readable_json is parsable object

tempList = list()
#iterates through every item in the json and appends to the dictionary
for item in readable_json:
    idNum = item['id']
    #decalre tempList to add to json
    print('Information being retrieved from school id:',idNum,"\n")
    with urlopen("https://assist.org/api/institutions/"+str(idNum)+"/agreements") as response:
        tempSchool = response.read()

    tempSchool_json = json.loads(tempSchool)

    tempArr = []
    for school in tempSchool_json:
        if school['institutionParentId'] not in tempArr:
            tempArr.append(school['institutionParentId'])

    x = {
       "id": idNum,
       "agreementIds" : tempArr
    }
    tempList.append(x)

with open('agreement_ids.json', 'w') as f:   
    json.dump(tempList, f, indent = 2)