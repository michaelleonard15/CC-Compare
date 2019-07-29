import os
import tempfile
import json
import pprint

from flask import url_for
from flaskr.db import get_db, get_dests, get_majors, get_school_dict
import tests.values_testing as vals


### TESTING ORIGINS ENDPOINT


# Checks that origin-schools responds with status code 200.
def test_origin_responds(client):

    response = client.get('/api/origin-schools/')
    assert response.status_code == 200

# Checks that origin-schools responds with a nonempty list.
def test_origin_returns_list(client):

    response = client.get('/api/origin-schools/')
    response_list = response.json

    # print statements will only pass through if test fails
    # or if you run pytest -s
    print(type(response_list))
    
    assert isinstance(response_list, list)
    assert len(response_list) > 0


# Checks that the origin-schools list: 
#   1. contains the same IDs as those stored in the database; 
#   2. is in ascending order.
def test_origin_contains_all_ids(client):

    response = client.get('/api/origin-schools/')
    # response.json is from pytest-flask: https://pytest-flask.readthedocs.io/en/latest/features.html#
    # it automatically parses it for us
    response_list = response.json
    id_list = [school['id'] for school in response_list]
    assert vals.valid_origins == id_list


### TESTING DESTINATIONS ENDPOINT


# Checks that dest-schools responds with status code 200.
def test_dest_responds(client):

    response = client.get('/api/dest-schools/')
    assert response.status_code == 200


## I want to modify this test to work, but at the moment it isn't working...

# # Checks if get_dests returns the same destination list as the ones found on ASSIST.
# def test_has_correct_destinations(client):

#     # Opening agreement_ids
#     with open(os.getcwd()+'/tests/testdata/agreement_ids.json') as f:
#         agreement_ids = json.load(f)

    
#     for origin in agreement_ids:
#         origin_id = origin['id']

#         # Making the request
#         endpoint_str = '/api/dest-schools/?origin=' + str(origin_id)
#         response = client.get(endpoint_str)

#         # Pulling out an array of just destination ids
#         id_list = [school['id'] for school in response.json]
#         print("Origin ID: " + str(origin_id))

#         assert origin['agreementIds'] == id_list