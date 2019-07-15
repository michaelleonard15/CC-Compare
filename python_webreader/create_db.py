import sqlite3
import json

conn = sqlite3.connect('test.db')

db = conn.cursor()

db.execute ("""CREATE TABLE agreements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_id INTEGER NOT NULL,
        target_id INTEGER NOT NULL,
        major TEXT NOT NULL,
        agreement_json TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        agreement_id INTEGER NOT NULL
    )
""")

db.execute ("""CREATE TABLE school_names (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )
""")

db.execute ("""CREATE TABLE combinations (
        id INTEGER,
        agreesw INTEGER 
    )
""")
with open('schools_ids.json') as f:
    data = json.load(f)

for x in data:
    sourceId = x['id']
    idname = x['name']
    db.execute("INSERT INTO school_names VALUES (?, ?)", (sourceId, idname))
with open('agreement_ids.json') as f:
    data = json.load(f)
for x in data:
    for y in x['agreementIds']:
        db.execute("INSERT INTO combinations VALUES (?, ?)", (x['id'], y))
conn.commit()
conn.close()

