# The documentation in this file uses Python docstrings.
# See https://www.python.org/dev/peps/pep-0257/ for more info


# TODO: Refactor these to not be file-global
__current_id = 0
__current_neg_id = -1


def generate_matrix(agreement_list):
    """
    Generates a map containing a lookup table and matrix, ready for conversion to JSON
    and sending to the frontend.
    
    Args:
        agreement_list: A list containing 4 agreement maps (which were converted from JSON).
                        This argument will be mutated by this function.
    """
    global __current_id
    global __current_neg_id
    source_lookup = []
    dest_lookup = []
    matrix = []
    __current_id = 0
    __current_neg_id = -1
    dest_num = 1
    
    for agreement in agreement_list:
        # Ignoring section headers for now, since there's nothing there yet

        # You may wonder why we pass the whole source_lookup into _extract_sources,
        # but not into _extract_dests.
        # This is because if we have a duplicate, we want to merge it into the full
        # sources list. However, with destinations, we only want to merge it if it's
        # from the same school.
        current_dest_lookup = []
        _extract_rows(agreement, matrix, source_lookup, current_dest_lookup, dest_num)
        _fill_empty_dests(matrix, dest_num)
        dest_lookup = dest_lookup + current_dest_lookup
        dest_num += 1
    
    _fill_empty_dests(matrix, dest_num)
    # Concatenating lists
    lookup = source_lookup + dest_lookup
    sorted_lookup = sorted(lookup, key=lambda k: k['key'])
    return {'lookup': sorted_lookup, "equivalencyMatrix": matrix}
    

def _extract_rows(agreement, matrix, source_lookup, cur_dest_lookup, dest_num):
    """
    Extracts all sources from an agreement, 
    building onto the existing matrix and source lookup table.
    """
    running_cond = ""
    running_cond_val = 0
    cond_row_count = 0
    for section in agreement:

        cond_row_count += _get_row_count(section)
        if running_cond != "":
            if section['requirementType'] != running_cond:
                _add_section_header(matrix, running_cond, running_cond_val, cond_row_count)

        if section['requirementType'] != running_cond:
            # reset running cond
            running_cond = section['requirementType']
            running_cond_val = section['requirement']
            cond_row_count = 0

        start_index = _section_index_in_matrix(matrix, section, source_lookup)
        for i, row in enumerate(section['Equivalencies']):
            if(matrix[start_index + i] == []):
                _extract_source_row(row, matrix, source_lookup, start_index + i, dest_num)
            _extract_dest_row(row, matrix, cur_dest_lookup, start_index + i)

    # Handling any remaining condition groups
    if running_cond != "":
        _add_section_header(matrix, running_cond, running_cond_val, cond_row_count + 1)


def _add_section_header(matrix, cond, cond_val, row_count):

    # "condition": {"type": "UNITS", "number": 11, "rows": 9} 

    sect_first_row = matrix[len(matrix) - row_count]
    cond_obj = {'type': cond, 'number': cond_val, 'rows':row_count}

    # Adding it as an object inside the origin cell for this row
    sect_first_row[0]['condition'] = cond_obj

def _get_row_count(section):
    return len(section['Equivalencies'])


def _section_index_in_matrix(matrix, section, src_lookup):
    """
    Returns the starting position for the section in the matrix. 
    If the section is not yet in the matrix, it will append the appropriate
    amount of space to the end of the matrix.
    """

    sect_rows = section['Equivalencies']
    
    for start_pos in range(0, len(matrix) + 1 - len(sect_rows)):

        # TODO: conditional requirements?
        if section['requirementType'] != "":
            return _add_section_to_end(matrix, sect_rows)

        # Gets a slice of the matrix to check against
        submatrix = matrix[start_pos:(start_pos + len(sect_rows))]
        # Searching through matrix to find a correct spot
        for i, mtx_row in enumerate(submatrix):

            # # Check that previous cell relationToNext is ""
            if (start_pos > 0):
                if (i == 0) and ('relationToNext' in matrix[start_pos-1][0]):
                    break

            # Check that relationToNext is relationToNext
            sect_row = sect_rows[i]
            if(not _has_same_rel2next(sect_row, mtx_row)):
                break

            # Check that source classes are the same
            sect_origin_classes = sect_row['Source']
            mtx_origin_classes = mtx_row[0]['courses']
            if(not _is_same_class_group(sect_origin_classes, mtx_origin_classes, src_lookup)):
                break

            # if we're here, it matches up and we've found our section!
            return start_pos

    # If we've fallen out of the above loop, we need to add a blank section to the bottom
    return _add_section_to_end(matrix, sect_rows)



def _add_section_to_end(matrix, sect_rows):
    for i in range(0, len(sect_rows)):
        matrix.append([])

    return len(matrix) - len(sect_rows)


def _has_same_rel2next(sect_row, mtx_row):

    if('relationToNext' not in mtx_row[0]):
        return sect_row['relationToNext'] == ""
    else: 
        return sect_row['relationToNext'] == mtx_row[0]['relationToNext']


def _is_same_class_group(db_courses, matrix_courses, lookup):
    if len(db_courses) != len(matrix_courses):
        return False
    for i, subarray in enumerate(matrix_courses):
        if len(subarray) != len(db_courses[i]):
            return False
        for j, lookup_key in enumerate(subarray):
            db_course = db_courses[i][j]
            matrix_course = _get_course(lookup, lookup_key)

            # should courseName be added to this check? (probably not)
            if (db_course['courseID'] != matrix_course['courseID'] or 
                db_course['units'] != matrix_course['units']):
                return False
        
    return True
            

def _get_course(lookup, course_key):
    for course in lookup:
        if course['key'] == course_key:
            return course['course']
    else:
        raise LookupError('Tried to lookup nonexistant ID in lookup table')


def _extract_source_row(row, matrix, src_lookup, row_index, dest_num):
    """
    Extracts source schools from a row, building onto the existing matrix and the
    source lookup table for the current agreement.
    """
    courses = row['Source']
    
    # This is a nested list comprehension.
    # It generates a list of the form [[1], [2, 3]]
    course_group = [[_add_to_lookup(course, src_lookup, is_origin=True)
                     for course in sublist] for sublist in courses]

    new_cell = {'courses': course_group}
    if "relationToNext" in row and row['relationToNext'] != "":
        new_cell['relationToNext'] = row['relationToNext']
    matrix[row_index].append(new_cell)

    # Adding extra cells, if they're needed for column alignment
    for i in range(1, dest_num):
        matrix[row_index].append({'courses':[]})
    


def _extract_dest_row(row, matrix, cur_dest_lookup, row_index):
    """
    Extracts destination classes from a row, building onto the existing matrix and the 
    source lookup table for the current agreement.
    """
    dest_courses = row['Destination']
    
    # This is a nested list comprehension.
    # It generates a list of the form [[1], [2, 3]]
    dest_course_group = [[_add_to_lookup(course, cur_dest_lookup, is_origin=False)
                         for course in sublist] for sublist in dest_courses]
    
    new_cell = {'courses': dest_course_group}
    matrix[row_index].append(new_cell)


# TODO: can this be refactored into multiple functions for readability?
def _add_to_lookup(db_course, lookup, is_origin):
    """
    Adds the course to the lookup, and returns the lookup ID of that course.
    If the course already exists in the lookup table, it will return the
    existing lookup ID of that course.
    """
    global __current_id
    global __current_neg_id
    course_obj = db_course.copy()
    course_obj['isOrigin'] = False if (db_course['courseID'] == "") else is_origin
    course_obj['isSelected'] = False

    for entry in lookup:
        if entry['course'] == course_obj:
            return entry['key']

    # Handles the case that there is no courseID (should set negative key).
    if db_course['courseID'] == "":
        # We don't want to render these on page 2; setting isOrigin false.
        course_obj['isOrigin'] = False
        entry_id = __current_neg_id
        new_entry = { 'key': entry_id, 'course': course_obj }
        lookup.insert(0, new_entry)
        __current_neg_id -= 1

    # Standard case
    else:
        entry_id = __current_id
        new_entry = { 'key': entry_id, 'course': course_obj }
        lookup.append(new_entry)
        __current_id += 1

    return entry_id


# def _add_source_to_matrix(new_cell, matrix):
#     """
#     """
#     # Checking if the origin already exists in a row
#     for idx, row in enumerate(matrix):
#         if len(row) > 0 and row[0] == new_cell:
#             return idx
    
#     matrix.append([new_cell])
#     return (len(matrix) - 1)


def _fill_empty_dests(matrix, dest_num):
    """
    Goes through the matrix and adds empty destination classes wherever there is
    a cell missing in the column.
    """
    if len(matrix) <= 1:
        return
    for row in matrix:
        needed_cells = dest_num - len(row)
        for i in range(0, needed_cells):
            row.append({'courses':[]})


