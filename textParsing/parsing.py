import re
from FileSearcher import ToolBelt
from ClassCreator import *
from Utility import Utility
###
id_list = [
    'SRC_to_SJSU.txt',
    'SRC_to_SSU.txt',
    'SRC_to_UCLA.txt',
    '14782302.txt',
    '14782303.txt',
    '14782304.txt',
    '14782305.txt',
    '14782306.txt',
    '14782307.txt',
    '14782308.txt',
    '14782309.txt',
    '14782310.txt',
    '14782311.txt',
    '14782312.txt',
    '14782313.txt',
    '14782314.txt',
    '14782315.txt',
]
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
for item in id_list:
    matches_left.append(tool.getMatches(item, pattern_left))
    matches_right.append(tool.getMatches(item, pattern_right))
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
agreements = []
for left,right in zip(masterLeft,masterRight):
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
    sections.clear()
    

for idname,agreement in zip(id_list,agreements):
    with open(idname[:-4]+'.json', 'w') as f:
        tempList = list()
        for section in agreement:
            tempList.append(section.jsonify())
        json.dump(tempList, f, indent = 2)
    print('end')

