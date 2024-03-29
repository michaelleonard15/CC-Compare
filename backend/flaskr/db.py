# I'm gonna be straightforward with you, I don't really understand what's going on here

import sqlite3
import json

import click
# g is unique for each request and stores data that might be used by multiple functions during the request 
from flask import current_app, g, jsonify
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


def get_school_dict():
    with current_app.open_resource('static/schools_ids.json') as f:
        json_obj = json.load(f)

    school_dict = {school['id']:school['name'] for school in json_obj}

    return school_dict


def get_dests(origin_id):
    db = get_db()
    school_names = get_school_dict()

    query = "SELECT DISTINCT target_id FROM agreements WHERE source_id=(?) ORDER BY target_id ASC"
    rows = db.execute(query, (origin_id,)).fetchall()
  
    dest_array = [{'id':row[0], 'name':school_names[row[0]]} for row in rows]

    return(jsonify(dest_array))


def get_majors(origin_id, dest_id):
    db = get_db()

    click.echo("Calling get_majors with origin + destination:")
    click.echo(origin_id)
    click.echo(dest_id)

    query = "SELECT agreement_id, major FROM agreements WHERE source_id=(?) AND target_id=(?) ORDER BY major ASC"
    rows = db.execute(query, (origin_id, dest_id,)).fetchall()

    major_array = [{'id':row[0], 'name':row[1]} for row in rows]

    return jsonify(major_array)







def get_agreement(agreement_id):
    db = get_db()

    click.echo("Calling get_agreement with agreement_id: ")
    click.echo(agreement_id)

    query = "SELECT agreement_json FROM agreements WHERE agreement_id=(?)"
    row = db.execute(query, (agreement_id,)).fetchone()

    click.echo(row[0])

    return row[0]








def reset_db():
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

@click.command('reset-db')
@with_appcontext
def reset_db_command():
    """Clear the existing data and create new tables."""
    reset_db()
    click.echo('Cleared and reset the database.')
        

# The functions close_db() and reset_db() must be registered with the application instance.
# This init_app() function is called in the create_app() function in __init__.py.
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(reset_db_command)
