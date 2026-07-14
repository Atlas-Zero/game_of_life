import Game from './game.js'

const canvas = document.querySelector('#life');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 30;

// 0 = dead, 1 = alive
let board = Array.from({ length: COLS }, () =>
    Array.from({ length: ROWS }, () => 0)
);

// example: random init
for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
        board[x][y] = Math.random() < 0.3 ? 1 : 0;
    }
}
const centerX = (canvas.width - COLS * CELL_SIZE) / 2;
const centerY = (canvas.height - ROWS * CELL_SIZE) / 2;

function refreshCanvas(backgroundColor = '#ffffff') {
    ctx.fillStyle = backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    ctx.strokeStyle = '#000000';
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            ctx.strokeRect(
                centerX + x * CELL_SIZE,
                centerY + y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}

function drawCells() {
    for (let x = 0; x < COLS; x++) {
        for (let y = 0; y < ROWS; y++) {
            if (board[x][y] === 1) {
                ctx.fillStyle = '#000000'; // alive color
                ctx.fillRect(
                    centerX + x * CELL_SIZE,
                    centerY + y * CELL_SIZE,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }
}

refreshCanvas('#ffffff');
drawGrid();
drawCells();

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;

    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);

    if (cellX >= 0 && cellX < COLS && cellY >= 0 && cellY < ROWS) {
        board[cellX][cellY] = board[cellX][cellY] ? 0 : 1;
        refreshCanvas('#ffffff');
        drawGrid();
        drawCells();
    }
});

const game = new Game(ROWS, COLS, board);

function loop() {
    game.next();
    board = game.data;

    refreshCanvas('#ffffff');
    drawGrid();
    drawCells();

    requestAnimationFrame(loop);
}

loop();