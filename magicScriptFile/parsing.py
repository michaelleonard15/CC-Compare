import re
import os
import datetime
from FileSearcher import ToolBelt
from ClassCreator import *
from Utility import Utility
import json
###
id_list = []
    # 'SRC_to_SJSU.txt',
    # 'SRC_to_SSU.txt',
    # 'SRC_to_UCLA.txt',
    # '14782302.txt',
    # '14782303.txt',
    # '14782304.txt',
    # '14782305.txt',
    # '14782306.txt',
    # '14782307.txt',
    # '14782308.txt',
    # '14782309.txt',
    # '14782310.txt',
    # '14782311.txt',
    # '14782312.txt',
    # '14782313.txt',
    # '14782314.txt',
    # '14782315.txt',
agreements = dict()
with open(os.getcwd()+'/agreement_ids.json') as filetemp: 
        schools = json.load(filetemp) 
for testSchool in schools:        
  for x in testSchool['agreementIds']:
      with open(os.getcwd()+'/jsons/'+str(testSchool['id'])+'_'+str(x)+'.json',) as f: 
          readable_json = json.load(f) 
      for y in readable_json:
          tempID = str(y['key'])+'.txt'
          x = {
              'idName': tempID,
              'agreement' : None
          }
          id_list.append(x)

tool = ToolBelt()
#DEFINE PATTERNS HERE.####
pattern_left = re.compile(r'(.*)\|.*|----+')
pattern_right = re.compile(r'\|(.*)|----+')
class_key = re.compile(r'(?:[A-Z&]{1,8}\ )+[A-Z0-9.]{1,5}')
units = re.compile(r'\(\d\)')
####

#CREATE MATCHES FROM FILES HERE, PASS PATTERNS, GET MATCHES####

matches_left = []
matches_right = []
successful_ids = []
for item in id_list:
    try:
        matches_left.append(tool.getMatches(item['idName'], pattern_left))
        matches_right.append(tool.getMatches(item['idName'], pattern_right))
        successful_ids.append(item['idName'])
    except:
        continue
####

##CREATE LIST OF LISTS FOR SPECIFIED SIDE## 
masterLeft = []
masterRight = []
for left,right in zip(matches_left, matches_right):
    masterLeft.append(tool.createMasterList(left))
    masterRight.append(tool.createMasterList(right))

##
#The Master Lists are list of lists. Each sublist in the list is a set of equivalency criteria in the document
##

creator = Utility()

#search multiple sections
# for sectionLeft,sectionRight in zip(masterLeft,masterRight):
#     creator.searchSection(sectionLeft,sectionRight)
i = 0
for left,right in zip(masterLeft,masterRight):
    try:
        count = 1
        sections = []
        while count < left.__len__():
            if left[count].__len__() is 0:
                count+=1
                continue
            section = Section()
            section = creator.constructSection(left[count],right[count])
            sections.append(section)
            count+=1
        agreements.append(sections.copy())
        if agreements.get(successful_ids[i], None) is not None:
            agreements.__getitem__(successful_ids)['agreement'] = sections.copy()

    except:
        continue
    

if not os.path.exists(os.getcwd()+'/parsedjsons'):
          os.makedirs(os.getcwd()+'/parsedjsons')
          print('FOLDER CREATED!')    

for sID in successful_ids:
    try:
        with open(os.getcwd()+'/parsedjsons/'+sID[:-4]+'.json', 'w') as f:
            tempList = list()
            for section in agreements.__getitem__(sID):
                tempList.append(section.jsonify())
            json.dump(tempList, f, indent = 2)
    except:
        continue
    print('end')

