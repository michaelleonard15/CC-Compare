import os
import re
id_list = { 
    '14782302.txt',
    # '14782303.txt',
    # '14782304.txt',
    # '14782305.txt',
    # '14782306.txt',
    # '14782307.txt',
    # '14782308.txt',
    # '14782309.txt',
    # '14782310.txt',
    # '14782311.txt',
    # '14782312.txt',
    # '14782313.txt',
    # '14782314.txt',
    # '14782315.txt',
}
pattern = re.compile(r'.*\|.*')
matches = []
i = 0
for item in id_list:
    with open(os.getcwd()+'/textfiles/'+item) as f:
        i+=1
        print('Successfully opened files: ', i)
        contents = f.read()
        matches.append(pattern.finditer(contents))
for match in matches:
    for found in match:
        print(found)
