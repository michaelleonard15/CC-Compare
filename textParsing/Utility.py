import re
from ClassCreator import *

############ S T A R T PARSING UTILITY ##########################
class Utility():
    import re
    class_key = re.compile(r'(?:[A-Z&]{1,8}\ )+[A-Z0-9.]{1,5}')
    units = re.compile(r'\((\d)\)')
    courseName = re.compile(r'')
    checkNCA = re.compile(r'(No\scourse\sarticulated)|(No\sCurrent\sArticulation)|(Not\sArticulated)', re.IGNORECASE)
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

    def findRelation(self, line):
        if self.checkAND.search(line) is not None:
            return 'AND'
        if self.checkOR.search(line) is not None:
            return 'OR'
    # there is class key and unit information at the classpoint index, start at it
    def getClassPoints(self, section, startPoint, breakpoint):
        classPoints = list()
        count = startPoint
        while count < breakpoint:
            if((self.units.search(section[count]) is not None) and (self.class_key.search(section[count]) is not None)):
                classPoints.append(count)
            count+=1
        return classPoints.copy()
                
    def sync(self, leftSection,rightSection):
        if(leftSection.__len__() is rightSection.__len__()):
            return True
        else:
            raise ValueError("Section is not synced properly")
        return False
        
    def constructSection(self, leftSection, rightSection):
        if(self.sync(leftSection,rightSection)):
            breakpoints = self.getBreakPoints(leftSection)

            if breakpoints.__len__() is 0:
                section = Section()
                equivalency = Equivalency()
                dest_list = self.constructDestSource(leftSection)
                source_list = self.constructDestSource(rightSection)
                equivalency.setDest(dest_list)
                equivalency.setSource(source_list)
                section.addEquivalency(equivalency)
                return section
            else:
                section = Section()
                previous = 0
                count = 0
                while count <= breakpoints.__len__():
                    equivalency = Equivalency()
                    if count is breakpoints.__len__():
                        dest_list = self.constructDestSource(leftSection[previous:])
                        source_list = self.constructDestSource(rightSection[previous:])
                    else:
                        dest_list = self.constructDestSource(leftSection[previous:breakpoints[count]])
                        source_list = self.constructDestSource(rightSection[previous:breakpoints[count]])
                        previous = breakpoints[count]+1
                    equivalency.setDest(dest_list)
                    equivalency.setSource(source_list)

                    #if the count is at the last breakpoint, there will be no relation to next
                    #this is also the only time we look right at the AND or OR
                    if count is not breakpoints.__len__():
                        relation = self.findRelation(leftSection[breakpoints[count]])
                        equivalency.setRelation(relation)
                    count+=1
                    section.addEquivalency(equivalency)
                return section



    #returns a destsourcelist
    def constructDestSource(self, section):
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
                tempClassList.addClass(tempClass)
                dslist.addClassList(tempClassList)
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