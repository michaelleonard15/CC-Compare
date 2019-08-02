import re
from FileSearcher import ToolBelt
from ClassCreator import *
from Utility import Utility
###
id_list = [
    'SRC_to_SJSU.txt',
    #'SRC_to_SSU.txt',
    #'SRC_to_UCLA.txt',
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
]
tool = ToolBelt(id_list)
#DEFINE PATTERNS HERE.####
pattern_left = re.compile(r'(.*)\|.*|----+')
pattern_right = re.compile(r'\|(.*)|----+')
class_key = re.compile(r'(?:[A-Z&]{1,8}\ )+[A-Z0-9.]{1,5}')
units = re.compile(r'\(\d\)')
####

#CREATE MATCHES FROM FILES HERE, PASS PATTERNS, GET MATCHES####

matches_left = tool.getMatches(pattern_left)
matches_right = tool.getMatches(pattern_right)
####


####PRINT MATCHES
#tool.printMatches(matches_right)



##CREATE LIST OF LISTS FOR SPECIFIED SIDE## 
masterLeft = tool.createMasterList(matches_left)
masterRight = tool.createMasterList(matches_right)

##
#The Master Lists are list of lists. Each sublist in the list is a set of equivalency criteria in the document
##
creator = Utility()
# for sectionLeft,sectionRight in zip(masterLeft,masterRight):
#     for left,right in zip(sectionLeft,sectionRight):
#         #print(units.search(left))
#         #print(class_key.search(left))
    
#search multiple sections
# for sectionLeft,sectionRight in zip(masterLeft,masterRight):
#     creator.searchSection(sectionLeft,sectionRight)
count = 1
sections = []
while count < masterLeft.__len__():
    if masterLeft[count].__len__() is 0:
        count+=1
        continue
    section = Section()
    section = creator.constructSection(masterLeft[count],masterRight[count])
    sections.append(section)
    count+=1
    
print('end')

