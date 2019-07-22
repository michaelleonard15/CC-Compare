import sqlite3
import json
import datetime
import os

conn = sqlite3.connect('test.db')
db = conn.cursor()
db.execute("""
DROP TABLE IF EXISTS agreements
""")
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
# db.execute ("""CREATE TABLE school_names (
#         id INTEGER PRIMARY KEY,
#         name TEXT NOT NULL
#     )
# """)

# db.execute ("""CREATE TABLE combinations (
#         id INTEGER,
#         agreesw INTEGER 
#     )
# """)
# with open('schools_ids.json') as f:
#     data = json.load(f)

# for x in data:
#     sourceId = x['id']
#     idname = x['name']
#     db.execute("INSERT INTO agreements VALUES (?, ?)", (sourceId, idname))
# with open('agreement_ids.json') as f:
#     data = json.load(f)
# for x in data:
#     for y in x['agreementIds']:
#         db.execute("INSERT INTO combinations VALUES (?, ?)", (x['id'], y))
with open('agreement_ids.json') as f: 
            schools = json.load(f) 

for school in schools:
    for x in school['agreementIds']:
        with open(os.getcwd()+'/jsons/'+str(school['id'])+'_'+str(x)+'.json',) as f2: 
            readable_json = json.load(f2) 
            print('File opened:',x)
            print(datetime.datetime.now().time())
        for y in readable_json: 
            db.execute("INSERT INTO agreements ('source_id','target_id','major','agreement_json', 'agreement_id') VALUES (?, ?, ?, ?, ?)", (school['id'], x, y['label'], json.dumps(readable_json),y['key']))
            #db.execute("INSERT INTO agreements VALUES ('source_id' 'target_id' 'major' 'agreement_json', 'agreement_id')", (school['id'], x, y['label'], json.dumps(readable_json),y['key']))

conn.commit()
conn.close()