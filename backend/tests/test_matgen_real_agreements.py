import pprint
import os
import json
import flaskr.matrix_generator as matgen
import pytest

TEST_FILE_PATH = os.getcwd() + "/tests/testdata/real_agreements/"
OUTPUT_FILE_PATH = os.getcwd() + "/tests/output/"


def test_srjc_sjsu():
    with open(TEST_FILE_PATH + "SRC_to_SJSU.json") as f:
        sjsu = json.load(f)

    frontend_obj = matgen.generate_matrix([sjsu])

    with open(OUTPUT_FILE_PATH + 'srjc-sjsu-out.json', 'w') as fp:
        json.dump(frontend_obj, fp)

    pprint.pprint(frontend_obj)
    ## Uncomment this if you want to see the output on pytest
    # assert False


def test_srjc_ssu():
    with open(TEST_FILE_PATH + "SRC_to_SSU.json") as f:
        ssu = json.load(f)

    frontend_obj = matgen.generate_matrix([ssu])

    with open(OUTPUT_FILE_PATH + 'srjc-ssu-out.json', 'w') as fp:
        json.dump(frontend_obj, fp)

    pprint.pprint(frontend_obj)
    ## Uncomment this if you want to see the output on pytest
    # assert False


def test_srjc_ucla():
    with open(TEST_FILE_PATH + "SRC_to_UCLA.json") as f:
        ucla = json.load(f)

    frontend_obj = matgen.generate_matrix([ucla])

    with open(OUTPUT_FILE_PATH + 'srjc-ucla-out.json', 'w') as fp:
        json.dump(frontend_obj, fp)

    pprint.pprint(frontend_obj)
    ## Uncomment this if you want to see the output on pytest
    # assert False


def test_all_three():
    with open(TEST_FILE_PATH + "SRC_to_SJSU.json") as f:
        sjsu = json.load(f)
    with open(TEST_FILE_PATH + "SRC_to_SSU.json") as f:
        ssu = json.load(f)
    with open(TEST_FILE_PATH + "SRC_to_UCLA.json") as f:
        ucla = json.load(f)

    frontend_obj = matgen.generate_matrix([sjsu, ssu, ucla])

    with open(OUTPUT_FILE_PATH + 'combined-out.json', 'w') as fp:
        json.dump(frontend_obj, fp)

    pprint.pprint(frontend_obj)
    # ## Uncomment this if you want to see the output on pytest
    # assert False