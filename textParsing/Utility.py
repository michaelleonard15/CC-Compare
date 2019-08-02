import re
from ClassCreator import *

############ S T A R T PARSING UTILITY ##########################
class Utility():
    import re
    class_key = re.compile(r'(?:[A-Z&]{1,8}\ )+[A-Z0-9.]{1,5}')
    units = re.compile(r'\((\d)\)')
    courseName = re.compile(r'')
    checkNCA = re.compile(r'(No\scourse\sarticulated)|(No\sCurrent\sArticulation)', re.IGNORECASE)
    checkAND = re.compile(r'\sAND\s')
    checkO_R = re.compile(r'\sO_R_\s')
    checkand = re.compile(r'\s&_\s')
    checkOR = re.compile(r'\sOR\s')
    #########FUNCTIONS##########################################

    # there is an AND or an OR at the breakpoint index, +1 over it
    def getBreakPoints(self, section):
        count = 0
        breakpoints = list()
        breakpoints.clear()
        while(count < section.__len__()):
                if(self.checkAND.search(section[count]) is not None):
                    breakpoints.append(count)
                elif(self.checkOR.search(section[count]) is not None):
                    breakpoints.append(count)
                count+=1
        return breakpoints.copy()

    # there is class key and unit information at the classpoint index, start at it
    def getClassPoints(self, section, startPoint, breakpoint):
        classPoints = list()
        classPoints.clear()
        count = startPoint
        while count < breakpoint:
            if((self.units.search(section[count]) is not None) and (self.class_key.search(section[count]) is not None)):
                classPoints.append(count)
            count+=1
        return classPoints.copy()
                
    
    def constructEquivalency(self, leftSection, rightSection):
        equivalency = Equivalency()
        dest_list = self.getDestSourceList(leftSection,rightSection)
        source_list = self.getDestSourceList(rightSection,leftSection)
        equivalency.setDest(dest_list)
        equivalency.setSource(source_list)
        return equivalency

    def getDestSourceList(self, toBeSearched, otherSection):
        ##check if section is synced
        if(toBeSearched.__len__() is otherSection.__len__()):
            section = Section()
            count = 0
            breakpoints = self.getBreakPoints(toBeSearched)
        else:
            raise ValueError("Section is not synced properly")

        #contains no ANDs or ORs, dealing with strictly &_, O_Rs
        if breakpoints.__len__() is 0:
            return self.searchNoBPSection(toBeSearched)
        #contains ANDs and ORs
        else:
            for point in breakpoints:
                print(point)



    #returns a destsourcelist
    def searchNoBPSection(self, section):
        count = 0
        #LEFT SIDE HANDLING OF THE SECTIONG
        dslist = Destsource_list()
        points = self.getClassPoints(section, count, section.__len__())
        while count < section.__len__():
            tempClassList = ClassList()

            # there is class key and unit information at the classpoint index, start at it

            # it means that there was no class info here ###########
            #Case 1: it contains no course articulated.
            if(points.__len__() is 0 and self.checkNCA.search(section[0])):
                tempClass = Class('',"No course articulated", 0) 
                tempClassList.append(tempClass)
                dslist.addClassList(tempClassList.copy())
                return dslist
            #Case 2: it contains a misc. string
            elif(points.__len__() is 0):
                name = ""
                for line in section:
                    name+=line
                name = " ".join(name.split())
                tempClass = Class('',name, 0) 
                tempClassList.addClass(tempClass)
                dslist.addClassList(tempClassList)
                return dslist
                


            # this loop will run for EVERY class
            prevHadAnd = True
            for point in points:
                if prevHadAnd:
                    # get class at the current point and add it the class list
                    unit = self.units.search(section[point]).group(1)
                    key = self.class_key.search(section[point]).group(0)
                    tempClass = Class(key,'', int(unit))
                    tempClassList.addClass(tempClass) 
                    if self.checkand.search(section[point]) is not None:
                        prevHadAnd = True
                    else:
                        prevHadAnd = False
                        dslist.addClassList(tempClassList)
                # elif(point>0 and (self.checkO_R.search(section[point-1]) is None)):
                else:
                    tempClassList = ClassList()
                    if self.checkand.search(section[point]) is not None:
                        prevHadAnd = True
                    unit = self.units.search(section[point]).group(1)
                    key = self.class_key.search(section[point]).group(0)
                    tempClass = Class(key,'', int(unit))
                    tempClassList.addClass(tempClass)
                    dslist.addClassList(tempClassList) 
                count+=1
            return dslist


    # def searchForMisc(self, section):
    #     tempClassList = ClassList()
    #     tempDestSource = Destsource_list()
    #     if  (self.checkNCA.search(section[0]) is not None):
    #         tempClass = Class('',"No course articulated", 0) 
    #         tempClassList.append(tempClass)
    #         tempDestSource.addClassList(tempClassList.copy())
    #         return tempDestSource
    #     #Case 2: it contains a misc. string
    #     else:
    #         name = ""
    #         for line in section:
    #             name.__add__(line)
    #         " ".join(name.split())
    #         tempClass = Class('',name, 0) 
    #         tempClassList.addClass(tempClass)
    #         dslist.addClassList(tempClassList)
    #         break

    # def createSubsection(self, currIndex, section):
    #     subSection = []
    #     while(currIndex < section.__len__()):
    #         startIndex = currIndex
    #         if(section(currIndex).contains('OR')):
    #             print(currIndex)
    #             subSection.append(section[startIndex:currIndex])
    #             return subSection







    # classList = ClassList()

    # # prelimanary cases
    # if self.units.search(toBeSearched[count]) is not None:
    #     unit = self.units.search(toBeSearched[count])
    #     courseKey = self.class_key.search(toBeSearched[count])

    # # handle 'No course articulated'
    # elif self.checkNCA is not None:
    #     tempClass = Class()
    #     tempClass.setCourseName("No course articulated")


    # if self.checkand(toBeSearched[count]):
    #     classList.addClasss(Class(courseKey, "",unit))