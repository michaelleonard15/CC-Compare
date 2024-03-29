import pprint
import os
import json
import flaskr.matrix_generator as matgen
import pytest

TEST_FILE_PATH = os.getcwd() + "/tests/testdata/matrix_generator/"
## TEST FILE 1: SINGLE SCHOOL ##

@pytest.fixture
def set_ids():
    matgen.__current_id = 0
    matgen.__current_neg_id = -1


def assert_lookup_equal(lookup1, lookup2):
    # https://stackoverflow.com/a/73050
    # This compares the two lookups, sorted by key.
    assert sorted(lookup1, key=lambda k: k['key']) == sorted(lookup2, key=lambda k: k['key'])


def test_generate_matrix_single_agreement():
    with open(TEST_FILE_PATH + "test1/dbformat.json") as f:
        test1_db = json.load(f)
    with open(TEST_FILE_PATH + "test1/frontend-ready.json") as f:
        test1_frontend = json.load(f)
    
    frontend_obj = matgen.generate_matrix([test1_db])

    pprint.pprint(frontend_obj)
    assert_lookup_equal(frontend_obj['lookup'], test1_frontend['lookup'])
    # TODO: Write helper function to check if equivalency matrix is equal, ignoring order of rows, 
    #       but maintaining unit/class groupings and AND/OR row relationships.
    assert frontend_obj['equivalencyMatrix'] == test1_frontend['equivalencyMatrix']

def test_generate_matrix_three_agreements():
    with open(TEST_FILE_PATH + "test2/school1-db.json") as f:
        school1 = json.load(f)
    with open(TEST_FILE_PATH + "test2/school2-db.json") as f:
        school2 = json.load(f)        
    with open(TEST_FILE_PATH + "test2/school3-db.json") as f:
        school3 = json.load(f)
    with open(TEST_FILE_PATH + "test2/frontend-ready.json") as f:
        frontend_ready = json.load(f)

    frontend_obj = matgen.generate_matrix([school1, school2, school3])
    pprint.pprint(frontend_obj)
    
    assert_lookup_equal(frontend_obj['lookup'], frontend_ready['lookup'])
    assert frontend_obj['equivalencyMatrix'] == frontend_ready['equivalencyMatrix']


def test_generate_matrix_rel2next():
    with open(TEST_FILE_PATH + "test3/school1-db.json") as f:
        school1 = json.load(f)
    with open(TEST_FILE_PATH + "test3/school2-db.json") as f:
        school2 = json.load(f)        
    with open(TEST_FILE_PATH + "test3/school3-db.json") as f:
        school3 = json.load(f)
    with open(TEST_FILE_PATH + "test3/frontend-ready.json") as f:
        frontend_ready = json.load(f)

    frontend_obj = matgen.generate_matrix([school1, school2, school3])
    # pprint.pprint(frontend_obj)
    print("expected matrix:")
    pprint.pprint(frontend_ready['equivalencyMatrix'])
    print("actual matrix:")
    pprint.pprint(frontend_obj['equivalencyMatrix'])

    assert_lookup_equal(frontend_obj['lookup'], frontend_ready['lookup'])
    assert frontend_obj['equivalencyMatrix'] == frontend_ready['equivalencyMatrix']


def test_extract_rows(set_ids):
        # Opening files
    with open(TEST_FILE_PATH + "test1/dbformat.json") as f:
        test1_db = json.load(f)
    # with open(TEST_FILE_PATH + "test1-frontend-after-origin.json") as f:
    #     test1_after_origin = json.load(f)
    with open(TEST_FILE_PATH + "test1/frontend-ready.json") as f:
        test1_frontend = json.load(f)
    with open(TEST_FILE_PATH + "test1/origin-lookup.json") as f:
        test1_origin_lookup = json.load(f)
    with open(TEST_FILE_PATH + "test1/dest-lookup.json") as f:
        test1_dest_lookup = json.load(f)
    
    matrix = []
    src_lookup = []
    cur_dest_lookup =[]

    matgen._extract_rows(test1_db, matrix, src_lookup, cur_dest_lookup, 1)

    matrix_expected = test1_frontend['equivalencyMatrix']

    pprint.pprint(matrix_expected)
    print("actual:")
    pprint.pprint(matrix)

    assert matrix == matrix_expected
    assert src_lookup == test1_origin_lookup
    assert cur_dest_lookup == test1_dest_lookup

    
def test_extract_source_row(set_ids):

    # Opening files
    with open(TEST_FILE_PATH + "test1/dbformat.json") as f:
        test1_db = json.load(f)
    with open(TEST_FILE_PATH + "test1/frontend-after-origin.json") as f:
        test1_after_origin = json.load(f)

    ## ROW 1

    # Initialization
    row = test1_db[0]['Equivalencies'][0]
    matrix = [[]]
    src_lookup = []

    # Running
    matgen._extract_source_row(row, matrix, src_lookup, 0, 1)

    # Expected values
    lookup_expected = [{
        "key": 0,
        "course": {
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

    row = test1_db[0]['Equivalencies'][1]
    matrix.append([])

    # Running
    matgen._extract_source_row(row, matrix, src_lookup, 1, 1)

    # Expected values
    lookup_expected = test1_after_origin['lookup'][slice(1, 6)]
    matrix_expected = test1_after_origin['equivalencyMatrix'][slice(0, 2)]

    # Assertions
    assert matrix == matrix_expected
    assert src_lookup == lookup_expected

def test_add_to_lookup(set_ids):

    db_course = {"courseID":"ENGL 1A", "courseName": "College Composition", "units":4}
    lookup = []
    new_id = matgen._add_to_lookup(db_course, lookup, is_origin=True)

    lookup_expected = [
        {"key": 0,
         "course": {
             "isSelected": False,
             "courseName": "College Composition",
             "courseID": "ENGL 1A",
             "units": 4,
             "isOrigin": True}}]
    
    assert lookup == lookup_expected
    assert new_id == 0

def test_add_to_lookup_duplicates(set_ids):

    course1 = {"courseID":"ENGL 1A", "courseName": "College Composition", "units":4}
    course2 = {"courseID":"ENGL 1A", "courseName": "College Composition", "units":4}
    lookup = []

    new_id = matgen._add_to_lookup(course1, lookup, is_origin=True)

    lookup_expected = [
        {"key": 0,
         "course": {
             "isSelected": False,
             "courseName": "College Composition",
             "courseID": "ENGL 1A",
             "units": 4,
             "isOrigin": True}}]

    assert new_id == 0
    assert lookup == lookup_expected

    new_id = matgen._add_to_lookup(course2, lookup, is_origin=True)

    assert new_id == 0
    assert lookup == lookup_expected

def test_add_to_lookup_no_courseID(set_ids):

    with open(TEST_FILE_PATH + "test1/frontend-after-origin.json") as f:
        test1_after_origin = json.load(f)
    
    course = {"courseID":"", "courseName": "No course articulated", "units":0}
    lookup = []

    new_id = matgen._add_to_lookup(course, lookup, is_origin=True)

    lookup_expected = [test1_after_origin['lookup'][0]]

    assert new_id == -1
    assert lookup == lookup_expected