import os

class ToolBelt:
    #Get matches for the pattern within the file list
    def getMatches(self,filename, pattern):

        
        with open(os.getcwd()+'/'+filename) as f:
            contents = f.read()
        matches =pattern.finditer(contents)
        return matches

    def printMatches(self, matches):
        for match in matches:
            for x in match:
                    print(x.group(1))

    def createMasterList(self, matches):
        temp = []
        masterList = []
        for found in matches:
                if found.group(1) is not None:
                    temp.append(found.group(1))
                if found.group(1) is None:
                    masterList.append(temp.copy())
                    temp.clear()
        return masterList    