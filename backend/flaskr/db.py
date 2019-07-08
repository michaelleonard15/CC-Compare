# I'm gonna be straightforward with you, I don't really understand what's going on here

import sqlite3

import click
# g is unique for each request and stores data that might be used by multiple functions during the request 
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        # sqlite3.connect(':memory:') # this stores the db in RAM instead of disk; may be useful for testing
        # You can connect to a file, even if it doesn't exist yet...
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # From flask docs:
        # sqlite3.Row tells the connection to return rows that behave like dicts. 
        # This allows accessing the columns by name.
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    # Explanation from flask tutorial:
    # "open_resource() opens a file relative to the flaskr package, 
    # which is useful since you won’t necessarily know where that location is when 
    # deploying the application later. get_db returns a database connection, 
    # which is used to execute the commands read from the file."
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# click.command defines a command called init-db. it will call the init_db function
# https://click.palletsprojects.com/en/7.x/api/#click.command for info on this function
# Flask uses Click for its CLI interaction
# http://flask.pocoo.org/docs/1.0/cli/#cli for more info about command line and Flask
@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

# The functions close_db() and init_db() must be registered with the application instance.
# This init_app() function is called in the create_app() function in __init__.py.
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)