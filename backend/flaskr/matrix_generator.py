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
    source_lookup = []
    dest_lookup = []
    matrix = [[]]
    __current_id = 0
    __current_neg_id = -1

    for agreement in agreement_list:
        # Ignoring section headers for now, since there's nothing there yet

        # You may wonder why we pass the whole source_lookup into _extract_sources,
        # but not into _extract_dests.
        # This is because if we have a duplicate, we want to merge it into the full
        # sources list. However, with destinations, we only want to merge it if it's
        # from the same school.
        _extract_sources(agreement, matrix, source_lookup)
        current_dest_lookup = _extract_dests(agreement, matrix)
        dest_lookup = dest_lookup + current_dest_lookup

    
    # Concatenating lists
    lookup = source_lookup + dest_lookup

    # # Assigning IDs
    # # ! we might not be able to do this here
    # i = 0
    # for course in lookup:
    #     if 'id' not in course:
    #         course['id'] = i
    #         i += 1


def _extract_sources(agreement, matrix, source_lookup):
    """
    Extracts all sources from an agreement, 
    building onto the existing matrix and source lookup table.
    """
    for section in agreement:
        for row in section:
            _extract_source_row(row, matrix, source_lookup)


def _extract_source_row(row, matrix, src_lookup):
    """
    Extracts source schools from a row, building onto the existing matrix and the
    source lookup table for the current agreement.
    """
    courses = row['Source']['classes']
    # This is a nested list comprehension.
    # It generates a list of the form [[1], [2, 3]]
    course_group = [[_add_to_lookup(course, src_lookup, is_origin=True)
                     for course in sublist] for sublist in courses]
    new_cell = {'courses': course_group}
    if "RelationToNext" in row:
        new_cell['relationToNext'] = row['RelationToNext']
    

    # for sublist in courses:
    #     for course in sublist:
    #         # add course to src lookup; increment
    #         new_id = _add_to_lookup(course, src_lookup, is_origin=True)
    #         # modify course in-place within the row
    # add courses grouping to matrix
    # if applicable, add relationToNext


def _add_to_lookup(db_course, lookup, is_origin):
    """
    Adds the course to the lookup, and returns the lookup ID of that course.
    """
    global __current_id
    course_obj = db_course.copy()
    course_obj['isOrigin'] = is_origin
    course_obj['isSelected'] = False


    for index, entry in enumerate(lookup):
        if entry['course'] == course_obj:
            return index

    entry_id = __current_id
    new_entry = { 'key': entry_id, 'course': course_obj }

    lookup.append(new_entry)
    __current_id += 1
    return entry_id


def _extract_dests(agreement,matrix):
    """
    Extracts all destinations from an agreement, building onto the existing matrix.
    Returns a new destination lookup table for this agreement.
    """
    cur_dest_lookup = []
    for section in agreement:
        for row in section:
            _extract_dest_row(row, matrix, cur_dest_lookup)
    
    _fill_empty_dests(matrix)
    return cur_dest_lookup


def _extract_dest_row(row, matrix, cur_dest_lookup):
    """
    Extracts destination classes from a row, building onto the existing matrix and the 
    source lookup table for the current agreement.
    """

    pass


def _fill_empty_dests(matrix):
    """
    Goes through the matrix and adds empty destination classes wherever there is
    a cell missing in the column.
    """

    pass


### NOTES
# relationToNext ==> relationToNext 
    # key ==> courseID
    # name ==> courseName
    # units (string) ==> units (integer)
    # after replacing objects with numbers, array structure should be IDENTICAL
# 
