import os
import re
from FileSearcher import ToolBelt
id_list = [
    '14782302.txt',
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
class_key = re.compile(r'[A-Z]{2-4}\ ')
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
