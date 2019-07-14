import os

from flask import Flask, jsonify, request, url_for, render_template
from flask_cors import CORS

# TODO: Write instructions on running backend in README

# This is an "Application Factory".
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        
    )

    # enabling CORS https://flask-cors.readthedocs.io/en/latest/
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    ### MAIN PAGE ###
    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    # a simple page that says hello
    @app.route('/hello/')
    def hello():
        return 'Hello, World!'

    @app.route('/api/origin-schools/')
    def origin_schools():
        app.logger.info(request.args.to_dict())
        array = [{'id': 1, 'name': 'cool'}, 
                 {'id': 2, 'name': 'dude'}, 
                 {'id': 57, 'name': 'Santa Rosa Junior College'}]
        return jsonify(array) 

    # API call to get the destinations list
    @app.route('/api/dest-schools/') #, methods=['POST'])
    def dest_schools():
        app.logger.info(request.args.to_dict())
        origin_id = request.args.get('origin')
        array = db.get_dest_array(origin_id)
        return jsonify(array) 

    # This section runs our init_app function in db.
    from . import db
    db.init_app(app)

    return app