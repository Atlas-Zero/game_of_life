from grid import Grid

# RULES
# Any live cell with fewer than two live neighbours dies, as if by underpopulation.
# Any live cell with two or three live neighbours lives on to the next generation.
# Any live cell with more than three live neighbours dies, as if by overpopulation.
# Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

class Game():
    def __init__(self, rows: int, cols: int):
        self.grid = Grid(rows, cols)
        
    def next(self):
        new_data = [row[:] for row in self.grid.data]

        for row in range(1, self.grid.rows - 1):
            for col in range(1, self.grid.cols - 1):
                neighbours = [
                    self.grid.data[row - 1][col - 1], self.grid.data[row - 1][col], self.grid.data[row - 1][col + 1],
                    self.grid.data[row][col - 1],                                     self.grid.data[row][col + 1],
                    self.grid.data[row + 1][col - 1], self.grid.data[row + 1][col], self.grid.data[row + 1][col + 1],
                ]

                alive_count = sum(neighbour == 1 for neighbour in neighbours)
                cell = self.grid.data[row][col]

                if cell == 1:
                    new_data[row][col] = 1 if alive_count in (2, 3) else 0
                else:
                    new_data[row][col] = 1 if alive_count == 3 else 0

        self.grid.data = new_data             
                    
        