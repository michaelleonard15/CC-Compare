import json
from urllib.request import urlopen # using the urllib built in module, we are importing urlopen
from collections import namedtuple

with urlopen("https://assist.org/api/institutions") as response:
    source = response.read()
    # setting source variable as response upon which read is being called, not very readable

readable_json = json.loads(source)
#readable_json is parsable object

schools = list()

#iterates through every item in the json and appends to the dictionary
for item in readable_json:
    idNum = item ['id']
    for x in item ['names']:# names is an array, so we must access its first and only element with 0
        name = x['name']
    x = {
        "id": idNum,
        "name": name
    }
    #x is dictionary item to be added to the list of schools
    schools.append(x)

with open('schools_ids.json', 'w') as f:   
    json.dump(schools, f, indent = 2)



