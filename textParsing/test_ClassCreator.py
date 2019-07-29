import pytest

from ClassCreator import *

# Class

def test_class():
   c = Class()
   c.setKey("PHIL 204")
   c.setName("Introduction to the Philosophy of Science")
   c.setUnits(4)
   object = c.getClass()
   assert object['key'] == "PHIL 204"
   assert object['name'] == "Introduction to the Philosophy of Science"
   assert object['units'] == 4
   

def test_class_completion():
   c = Class()
   print(c.isCompleted)
   assert c.isCompleted == False
   c.complete()
   assert c.isCompleted == True
   

# ClassList

def test_classlist_completion1():
   class_lists = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c1.complete()

   class_lists.addClass(c1)
   class_lists.addClass(c2)
   class_lists.addClass(c3)

   assert class_lists.checkCompletion() == False


def test_classlist_completion2():
   class_lists = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c3.complete()

   class_lists.addClass(c1)
   class_lists.addClass(c2)
   class_lists.addClass(c3)

   assert class_lists.checkCompletion() == False


def test_classlist_completion3():
   class_lists = ClassList()
   c1 = Class()
   c2 = Class()
   c3 = Class()

   c1.complete()
   c2.complete()
   c3.complete()

   class_lists.addClass(c1)
   class_lists.addClass(c2)
   class_lists.addClass(c3)

   assert class_lists.checkCompletion() == True