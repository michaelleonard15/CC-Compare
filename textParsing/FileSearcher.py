import os

class ToolBelt:
    fileList = []
    def __init__(self,files):
        self.fileList = files
    
    #Get matches for the pattern within the file list
    def getMatches(self, pattern):
        matches = []
        for x in self.fileList:
            with open(os.getcwd()+'/textfiles/'+x) as f:
                contents = f.read()
            matches.append(pattern.finditer(contents))
            return matches

    def printMatches(self, matches):
        for match in matches:
            for x in match:
                    print(x.group(1))

    def createMasterList(self, side):
        temp = []
        masterList = []
        for match in side:
            for found in match:
                    if found.group(1) is not None:
                                    temp.append(found.group(1))
                    if found.group(1) is None:
                            masterList.append(temp.copy())
                            temp.clear()
        return masterList    