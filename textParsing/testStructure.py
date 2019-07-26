

# #####THIS IS THE MASTER LIST, ONE FOR EVERY AGREEMENT##########
# agreementKey = {
#     "source_list": source_list,
#     "destin_list": dest_list
# }


#source/dest_list is composed of source_sublists, its index of 0 correspondes to index of 0 to dest_list
source_list = []
dest_list = []
#they make up the source_list, composed of classes
source_sublist = []
dest_sublist = []

#this is essentially the smallest object, composed of classes with AND relationships, only one class if no and relationship
smallest_list = []

#temp, class 1, this is going to be added to the smallest_list
temp = {
    "key": "ENGL 201B",
    "name": "English Composition: Introduction to Literature and Critical Thinking",
    "units": 4
}
smallest_list.append(temp.copy())
#add class 1 of 2 with O_R_ relationship
source_sublist.append(smallest_list.copy())

#smallest_list is a temp object, it will be cleared so the next class can be added
smallest_list.clear()
temp = {
    "key": "ENGL 201C",
    "name": "English Composition: Critical Thinking",
    "units": 4
}

smallest_list.append(temp.copy())
#add class 2 of 2 with O_R_ relationship
source_sublist.append(smallest_list.copy())
smallest_list.clear()


#add O_R_ relationship to the sourcelist index of [0]
source_list.append(source_sublist.copy())
################################################################
#destination side
temp = {
    "key": "ENGL 2",
    "name": "Critical Thinking and Writing",
    "units": 3
}

#add sole class to sublist, consists of 1 because no O_R_ relationships
#if class had AND relationship, it would be a list
smallest_list.append(temp.copy())
dest_sublist.append(smallest_list.copy())
smallest_list.clear()
#add the sole class relationship to the destlist index of [0]
dest_list.append(dest_sublist.copy())
for dest_sub,source_sub in zip(dest_list, source_list):

    print('FROM SOURCE SCHOOL, CLASS(ES):')
    for x in source_sub:
        for y in x:
            print(y)

    print('ABOVE ARE EQUIVALENT TO:')
    for x in dest_sub:
        for y in x:
            print(y)
