import re
from ClassCreator import *

############ S T A R T PARSING UTILITY ##########################
class Utility():
    import re
    class_key = re.compile(r'(?:[A-Z&]{1,8}\ )+[A-Z0-9.]{1,5}')
    units = re.compile(r'\(\d\)')
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
                classPoints.append(count+1)
            count+=1
        return classPoints.copy()
                
    
    def searchSection(self, leftSection, rightSection):
        if(leftSection.__len__() is rightSection.__len__()):
            section = Section()
            count = 0
            breakpoints = self.getBreakPoints(leftSection)


        #contains no AND or OR
        if breakpoints.__len__() is 0:
            count = 0
            #LEFT SIDE HANDLING OF THE SECTIONG
            dest_list = Destsource_list()
            points = self.getClassPoints(leftSection, count, leftSection.__len__())
            equivalency = Equivalency()
            while count < leftSection.__len__():
                tempClassList = ClassList()

                # there is class key and unit information at the classpoint index, start at it

                # it means that there was no class info here ###########
                #Case 1: it contains no course articulated.
                if(points.__len__() is 0 and self.checkNCA.search(leftSection[0])):
                    tempClass = Class('',"No course articulated", 0) 
                    tempClassList.append(tempClass)
                    dest_list.addClassList(tempClassList.copy())
                    break
                #Case 2: it contains a misc. string
                elif(points.__len__() is 0):
                    name = ""
                    for line in leftSection:
                        name.__add__(line)
                    " ".join(name.split())
                    tempClass = Class('',name, 0) 
                    tempClassList.addClass(tempClass)
                    dest_list.addClassList(tempClassList)
                    break


                # this loop will run for EVERY class
                prevHadAnd = False
                for point in points:
                    if prevHadAnd:
                        # get class at the current point and add it the class list
                        unit = self.units.search(leftSection[point])
                        key = self.class_key.search(leftSection[point])
                        tempClass = Class(key,'', unit)
                        tempClassList.addClass(tempClass) 
                        if self.checkand.search(leftSection[point] is not None):
                            prevHadAnd = True
                        else:
                            prevHadAnd = False
                    elif(point>0 and (self.checkO_R.search(leftSection[point-1]) is None)):
                        if self.checkand.search(leftSection[point]) is not None:
                            prevHadAnd = True
                        unit = self.units.search(leftSection[point-1])
                        key = self.class_key.search(leftSection[point-1])
                        tempClass = Class(key,'', unit)
                        tempClassList.addClass(tempClass)
                        dest_list.addClassList(tempClassList)
                        equivalency.setDest(dest_list) 
                    count+=1
                return equivalency
                



        else:
            for point in breakpoints:
                print(point)
        if(leftSection.__len__() is not rightSection.__len__()):
            raise ValueError("Section is not synced properly")




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
    # if self.units.search(leftSection[count]) is not None:
    #     unit = self.units.search(leftSection[count])
    #     courseKey = self.class_key.search(leftSection[count])

    # # handle 'No course articulated'
    # elif self.checkNCA is not None:
    #     tempClass = Class()
    #     tempClass.setCourseName("No course articulated")


    # if self.checkand(leftSection[count]):
    #     classList.addClasss(Class(courseKey, "",unit))