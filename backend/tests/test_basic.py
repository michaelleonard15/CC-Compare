import os
import tempfile

import pytest
import pytest_flask

from flask import url_for, Response
from flaskr import create_app


@pytest.fixture
def app():
    app = create_app()
    return app

def test_hello(client):
    # This will be a response_class object
    # https://flask.palletsprojects.com/en/1.1.x/api/#flask.Flask.response_class
    hello = client.get(url_for('hello'))
    assert hello.status_code == 200
    