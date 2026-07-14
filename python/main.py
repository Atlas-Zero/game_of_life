from pprint import pprint
from life import Game
# WORKFLOW
# 1. unit test
# 2. implementation: "grid" -> nested list?
# 3. top layer: qt6?

def main():
    ROWS = 20 
    COLS = 20
    game = Game(ROWS, COLS)
    game.grid.add_glider()
    
    while True:
        for row in game.grid.data:
            print(row)
        print()
        input()
        game.next()

            


if __name__ == "__main__":
    main()
