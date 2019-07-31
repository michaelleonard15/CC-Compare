# The documentation in this file uses Python docstrings.
# See https://www.python.org/dev/peps/pep-0257/ for more info

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
    for sublist in courses:
        # add course to src lookup; increment
        # modify course in-place within the row
        # add new class to matrix
        pass
    # if applicable, add relationToNext


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