

class MatrixGenerator:
    

    def __init__(self):

        self.source_lookup = []
        self.dest_lookup = []
        self.matrix = [[]]
        self.agreements = []
        self.is_generated = false


    def add_agreement(self, agreement):

        pass
    

    # Generates and returns an object containing:
    #   - the class lookup table
    #   - the equivalency matrix
    def get(self):
        if not self.is_generated:
            self.generate
        

    
    def generate(self):
        _extract_all_courses

    def _extract_all_courses(self):

        for agreement in self.agreements:
            _extract_courses(self, agreement)


    def _extract_courses(self, agreement):
        
        for section in agreement:
            # Ignoring section headers for now, since there's nothing there yet
            for row in section:
                _extract_row(self, row)


    def _extract_row(self, row):
        





### NOTES
# relationToNext ==> relationToNext 
    # key ==> courseID
    # name ==> courseName
    # units (string) ==> units (integer)
    # after replacing objects with numbers, array structure should be IDENTICAL
# 