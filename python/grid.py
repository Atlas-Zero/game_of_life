class Grid:
    def __init__(self, rows: int, cols: int):
        self.rows = rows
        self.cols = cols
        self.data = self._create_grid()

    def _create_grid(self) -> list[list[int]]:
        return [[0 for _ in range(self.cols)] for _ in range(self.rows)]

    def add_glider(self):
        self.data[3][2] = 1
        self.data[3][3] = 1
        self.data[3][4] = 1
        self.data[2][4] = 1
        self.data[1][3] = 1