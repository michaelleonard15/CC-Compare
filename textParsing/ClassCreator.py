import re


# Per Agreement: Equivalencies < Equivalency < dest/source_list (this) < classList < class





# BEGIN Class
# class < class (this)
# a basic class
class Class:
    key = ""
    name = ""
    units = ""
    isCompleted = False

    def __init__(self):
        self.key = key

    def setKey(self, key):
        self.key = key
    
    def setName(self, name):
        self.name = name
    
    def setUnits(self, units):
        self.units = units

    def getClass(self):
        x = {
            "key":self.key,
            "name":self.name,
            "units":self.units
        }
        return x

    # the class has been completed
    def complete(self):
        isCompleted = True

# END Class


# BEGIN ClassList
# classList (this) < class
# all objects in classes are '&_' together, ALL objs in classes[] should be completed
class ClassList:
    classes = []
    classesCompletd = False

    # add class to classes
    def addClass(self, classObj):
        if isinstance(classObj, Class):
            self.classes.append(classObj)

    # checks if all the &_ classes are completed
    def checkCompletion(self):
        for x in self.classes:
            if x.isCompleted is True:
                self.classesCompleted = True
            else:
                self.classesCompleted = False
        return self.classesCompleted

# E N D ClassList





# Begin Destsource_list
# dest/source_list (this) < classList < class
# ONE object in classLists should be completed, representing 'O_R_'
class Destsource_list:
    classLists = []
    completed = False

    #add ClassList obj to classLists
    def addClassList(self, classList):
        if isinstance(classList, ClassList):
            self.classLists.append(classList)

    def checkCompletion(self):
        for x in classLists:
            if x.checkCompletion() is True:
                self.completed = True
        return self.completed

# E N D Destsource_list

# Begin Equivalency
# Equivalency (this) < dest/source_list
# this object is 1 per section in the agreement, can represent 'AND' as well as 'OR'
class Equivalency:
    source = None
    dest = None
    relationToNext = ""
    completed = False
    def setSource(self, sourceList):
        if isinstance(sourceList, Destsource_list):
            self.source = sourceList

    def setDest(self, destList):
        if isinstance(destList, Destsource_list):
            self.dest = destList
    
    def checkCompletion(self):
        if source.checkCompletion() or dest.checkCompletion():
            completed = True
        return completed
            
# E N D Equivalency



# Begin Equivalncies 
# Equivalencies (this) < Equivalency
class Equivalencies:
    equivalencyList = []

    def addEquivalency(self, equivalency):
        if isinstance(equivalency, Equivalency):
            self.equivalencyList.append(equivalency)

# E N D Equivalencies 


############# E N D STRUCTURES ###########################




############ S T A R T PARSING UTILITY ##########################
class Utility:
    class_key = re.compile(r'[A-Z]{2,4}\ [A-Z0-9]{1,4}')
    units = re.compile(r'\(\d\)')
    name = re.compile(r'')
    classes = []
    #########FUNCTIONS##########################################

    def searchSection(self, leftSection, rightSection):
        if(leftSection.__len__() is rightSection.__len__()):
            count = 0
            while(count < leftSection.__len__()):
                if(units.search(leftSection[count]) is not None):
                    unit = units.search(leftSection[count])
                    key = class_key.search(leftSection[count])
                
        else:
            raise ValueError("Section is not synced properly")




    # def createSubsection(self, currIndex, section):
    #     subSection = []
    #     while(currIndex < section.__len__()):
    #         startIndex = currIndex
    #         if(section(currIndex).contains('OR')):
    #             print(currIndex)
    #             subSection.append(section[startIndex:currIndex])
    #             return subSection
