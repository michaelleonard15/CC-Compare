import pprint
import os
import json
import flaskr.matrix_generator as matgen

TEST_FILE_PATH = os.getcwd() + "/tests/testdata/matrix_generator/"
## TEST FILE 1: SINGLE SCHOOL ##

def test_nothing():
    with open(TEST_FILE_PATH + "test1-db.json") as f:
        test1_db = json.load(f)
    
def test_extract_source_row():

    # Opening files
    with open(TEST_FILE_PATH + "test1-db.json") as f:
        test1_db = json.load(f)
    with open(TEST_FILE_PATH + "test1-after-origin.json") as f:
        test1_after_origin = json.load(f)

    ## ROW 1

    # Initializatio
    row = test1_db['Sections'][0]['1']
    matrix = [[]]
    src_lookup = []

    # RUNNING
    matgen._extract_source_row(row, matrix, src_lookup)

    # Expected values
    lookup_expected = [{"course": {
        "isSelected": False,
        "courseName": "College Composition",
        "courseID": "ENGL 1A",
        "units": 4,
        "isOrigin": True
      }}]
    matrix_expected = [[{"courses": [[0]], "relationToNext": "AND"}]]

    # Assertions
    assert matrix == matrix_expected
    assert src_lookup == lookup_expected

    ## ROW 2 ##

    row = test1_db['Sections'][0]['2']

    # RUNNING
    matgen._extract_source_row(row, matrix, src_lookup)

    # Expected values

    # Assertions