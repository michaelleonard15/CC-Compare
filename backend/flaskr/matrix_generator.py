# The documentation in this file uses Python docstrings.
# See https://www.python.org/dev/peps/pep-0257/ for more info
# Docstring


def generate_matrix(agreement_list):
    """
    Generates a map containing a lookup table and matrix, ready for conversion to JSON
    and sending to the frontend.
    
    Args:
        agreement_list: A list containing 4 agreement maps (which were converted from JSON)
    """
    source_lookup = []
    dest_lookup = []
    matrix = [[]]
    for agreement in agreement_list:
        # Ignoring section headers for now, since there's nothing there yet
        current_source_lookup = _extract_sources(agreement, matrix)
        current_dest_lookup = _extract_dest(agreement, matrix)
        

pr


def _extract_sources(matrix):
    """
    Extracts all sources from an agreement, building onto the existing matrix.
    Returns a source lookup table for this agreement.
    """
    cur_src_lookup = []

    for section in agreement:
        for row in section:
            _extract_source_row(agreement, matrix, cur_src_lookup, row)
    return cur_src_lookup



def _extract_dests(matrix):
    """
    Extracts all destinations from an agreement, building onto the existing matrix.
    Returns a destination lookup table for this agreement.
    """
    cur_dest_lookup = []
    for section in agreement:
        for row in section:
            _extract_dest_row(agreement, matrix, cur_dest_lookup, row)
    
    _fill_empty_dests(matrix)
    return cur_dest_lookup


def _extract_source_row(agreement, matrix, cur_src_lookup, row):
    """
    Extracts source schools from a row, building onto the existing matrix and the
    source lookup table for the current agreement.
    """

    pass


def _extract_dest_row(agreement, matrix, cur_dest_lookup, row):
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