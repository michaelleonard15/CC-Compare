# Per Agreement: Equivalencies < Equivalency < dest/source_list (this) < classList < class
import json




# BEGIN Class
# class < class (this)
# a basic class
class Class:
    def __init__(self, courseKey, courseName, units):
        self.courseKey = courseKey
        self.courseName = courseName
        self.units = units
        self.isCompleted = False

    # def __init__(self):
    #     self.courseKey = ""
    #     self.courseName = ""
    #     self.units = ""
    #     self.isCompleted = False

    def setKey(self, courseKey):
        self.courseKey = courseKey
    
    def setCourseName(self, courseName):
        self.courseName = courseName
    
    def setUnits(self, units):
        self.units = units

    def getClass(self):
        x = {
            "courseKey":self.courseKey,
            "courseName":self.courseName,
            "units":self.units
        }
        return x

    # the class has been completed
    def complete(self):
        self.isCompleted = True

# END Class


# BEGIN ClassList
# classList (this) < class
# all objects in classes are '&_' together, ALL objs in classes[] should be completed
class ClassList:
    def __init__(self):
        self.classes = list()
        self.classesCompleted = False
        

    # add class to classes
    def addClass(self, classObj):
        if isinstance(classObj, Class):
            print(self.classes)
            self.classes.append(classObj)
            print(self.classes)
        else: raise ValueError("Object added was not Class: " + type(classObj))

    # checks if all the &_ classes are completed
    def checkCompletion(self):
        
        self.classesCompleted = True
        for x in self.classes:
            # print("x:")
            # print(x.isCompleted)
            # print("cc:")
            # print(self.classesCompleted)
            if x.isCompleted and self.classesCompleted:
                self.classesCompleted = True
            else:
                self.classesCompleted = False
        return self.classesCompleted

# E N D ClassList





# Begin Destsource_list
# dest/source_list (this) < classList < class
# ONE object in classLists should be completed, representing 'O_R_'
class Destsource_list:
    # classLists = []
    # completed = False

    def __init__(self):
        self.classLists = []
        self.completed = False
    #add ClassList obj to classLists
    def addClassList(self, classList):
        if isinstance(classList, ClassList):
            self.classLists.append(classList)

    def checkCompletion(self):
        for x in self.classLists:
            if x.checkCompletion() is True:
                self.completed = True
        return self.completed

# E N D Destsource_list

# Begin Equivalency
# Equivalency (this) < dest/source_list
# this object is 1 per section in the agreement, can represent 'AND' as well as 'OR'
class Equivalency:
    # source = None
    # dest = None
    # relationToNext = ""
    # completed = False
    def __init__(self):
        self.source = None
        self.dest = None
        self.relationToNext = ""
        self.completed = False
    def setSource(self, sourceList):
        if isinstance(sourceList, Destsource_list):
            self.source = sourceList

    def setDest(self, destList):
        if isinstance(destList, Destsource_list):
            self.dest = destList
    def setRelation(self, relation):
        self.relationToNext = relation
    def checkCompletion(self):
        if source.checkCompletion() or dest.checkCompletion():
            completed = True
        return completed
            
# E N D Equivalency



# Begin Equivalncies 
# Equivalencies (this) < Equivalency
class Section:
    def __init__(self):
        self.equivalencyList = []
        self.requirementType = ""
        self.requirement = 0
    def addEquivalency(self, equivalency):
        if isinstance(equivalency, Equivalency):
            self.equivalencyList.append(equivalency)
            
    def jsonify(self):
        #Section containing multiple equivalency sets between AND and OR
        equivalencies = list()
        for equivalency in self.equivalencyList:
            dest = list()
            source = list()

            #Left side of the equivalency has multiple class lists
            for leftClassList in equivalency.dest.classLists:
                destClassList = list()
                #In the classlists there are multiple core lists, even with one class
                jclasses = list()
                for classObj in leftClassList.classes:
                    courseName = classObj.courseName
                    courseKey = classObj.courseKey
                    units = classObj.units
                    x ={
                        'courseName':courseName,
                        'courseID':courseKey,
                        'units': units
                    }
                    jclasses.append(x)
                destClassList.append(jclasses.copy())
                jclasses.clear()
                dest.append(destClassList)
            for rightClassList in equivalency.source.classLists:
                destClassList = list()
                #In the classlists there are multiple core lists, even with one class
                jclasses = list()
                for classObj in rightClassList.classes:
                    courseName = classObj.courseName
                    courseKey = classObj.courseKey
                    units = classObj.units
                    x ={
                        'courseName': courseName,
                        'courseID': courseKey,
                        'units': units
                    }
                    jclasses.append(x)
                destClassList.append(jclasses.copy())
                jclasses.clear()
                source.append(destClassList)
            x = {
                'Destination': dest,
                'Source': source,
                'relationToNext': equivalency.relationToNext
            }
            equivalencies.append(x)
        finObj = {
            'requirement' : self.requirement,
            'requirementType': self.requirementType,
            'Equivalencies' : equivalencies

        }
        return finObj
            

# E N D Equivalencies 


############# E N D STRUCTURES ###########################