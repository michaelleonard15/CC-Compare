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
    # hello will be a Response object
    # https://flask.palletsprojects.com/en/master/api/#response-objects
    response = client.get(url_for('hello'))
    assert response.status_code == 200
    text = response.get_data(as_text=True)
    assert text != ""
    assert "Hello" in text
    assert "World" in text
    
def test_index(client):
    response = client.get('/')
    assert response.status_code == 200
    text = response.get_data(as_text=True)
    assert "<h1>Flask is working!</h1>" in text