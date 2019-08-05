import os

from flask import Flask, request, url_for, render_template, json
from flask_cors import CORS

# TODO: Write instructions on running backend in README

# This is an "Application Factory".
def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        DATABASE=os.path.join(app.instance_path, 'test.db')
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
        return app.send_static_file('origin_ids.json')

    # API call to get the destinations list
    @app.route('/api/dest-schools/') #, methods=['POST'])
    def dest_schools():
        app.logger.info(request.args.to_dict())
        origin_id = request.args.get('origin')
        return db.get_dests(origin_id)


    # http://localhost:5000/api/majors/?origin=2&dest=4
    @app.route('/api/majors/') #, methods=['POST'])
    def majors():
        origin_id = request.args.get('origin')
        dest_id = request.args.get('dest')
        return db.get_majors(origin_id, dest_id)



    @app.route('/api/agreements/')
    def agreements():
        app.logger.info(request.args.to_dict())
        num = int(request.args.get('num'))
        ids = []
        for x in range(0, num):
            ids.append(request.args.get('id' + str(x)))
         
        app.logger.info("the IDs are")
        app.logger.info(ids)

        agreement_jsons = []
        for x in range(0, num):
            #app.logger.info(db.get_agreement( ids[x] ))
            agreement_jsons.append(json.loads(db.get_agreement(ids[x])) )

        app.logger.info(agreement_jsons)

        return {"request": "success"}

    # This section runs our init_app function in db.
    from . import db
    db.init_app(app)

    return app