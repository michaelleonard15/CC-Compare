from flaskr import create_app
import pytest
import pytest_flask

@pytest.fixture
def app():
    app = create_app()
    return app