import { useState } from 'react'
import './css/app.css'

interface GameConfig {
  width: number;
  height: number;
  mines: number;
}

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    width: 10,
    height: 10,
    mines: 10
  });
  const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const initializeBoard = () => {
    // Create empty board
    const board: CellState[][] = Array(gameConfig.height).fill(null).map(() =>
      Array(gameConfig.width).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );

    // Place mines randomly
    let minesToPlace = gameConfig.mines;
    while (minesToPlace > 0) {
      const x = Math.floor(Math.random() * gameConfig.width);
      const y = Math.floor(Math.random() * gameConfig.height);
      
      if (!board[y][x].isMine) {
        board[y][x].isMine = true;
        minesToPlace--;
      }
    }

    // Calculate neighbor mines
    for (let y = 0; y < gameConfig.height; y++) {
      for (let x = 0; x < gameConfig.width; x++) {
        if (!board[y][x].isMine) {
          let count = 0;
          // Check all 8 neighbors
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (
                ny >= 0 && ny < gameConfig.height &&
                nx >= 0 && nx < gameConfig.width &&
                board[ny][nx].isMine
              ) {
                count++;
              }
            }
          }
          board[y][x].neighborMines = count;
        }
      }
    }

    setGameBoard(board);
    setGameStatus('playing');
  };

  const handleCellClick = (x: number, y: number) => {
    if (gameStatus !== 'playing' || gameBoard[y][x].isFlagged) return;

    const newBoard = [...gameBoard.map(row => [...row])];
    
    if (newBoard[y][x].isMine) {
      // Game Over
      revealAllMines(newBoard);
      setGameBoard(newBoard);
      setGameStatus('lost');
      return;
    }

    revealCell(x, y, newBoard);
    setGameBoard(newBoard);

    // Check win condition
    if (checkWinCondition(newBoard)) {
      setGameStatus('won');
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || gameBoard[y][x].isRevealed) return;

    const newBoard = [...gameBoard.map(row => [...row])];
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
    setGameBoard(newBoard);
  };

  const revealCell = (x: number, y: number, board: CellState[][]) => {
    if (
      x < 0 || x >= gameConfig.width ||
      y < 0 || y >= gameConfig.height ||
      board[y][x].isRevealed ||
      board[y][x].isFlagged
    ) return;

    board[y][x].isRevealed = true;

    if (board[y][x].neighborMines === 0) {
      // Reveal all adjacent cells
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          revealCell(x + dx, y + dy, board);
        }
      }
    }
  };

  const revealAllMines = (board: CellState[][]) => {
    board.forEach(row => {
      row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      });
    });
  };

  const checkWinCondition = (board: CellState[][]): boolean => {
    return board.every(row =>
      row.every(cell =>
        (cell.isMine && !cell.isRevealed) || (!cell.isMine && cell.isRevealed)
      )
    );
  };

  const handleConfigSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    const mines = Number(formData.get('mines'));

    if (mines >= width * height) {
      alert('Too many mines for the given field size!');
      return;
    }

    setGameConfig({ width, height, mines });
    initializeBoard();
  };

  return (
    <div className="minesweeper">
      <h1>Minesweeper</h1>
      
      <form onSubmit={handleConfigSubmit} className="config-form">
        <div>
          <label>Width: </label>
          <input
            type="number"
            name="width"
            min="5"
            max="30"
            defaultValue={gameConfig.width}
          />
        </div>
        <div>
          <label>Height: </label>
          <input
            type="number"
            name="height"
            min="5"
            max="30"
            defaultValue={gameConfig.height}
          />
        </div>
        <div>
          <label>Mines: </label>
          <input
            type="number"
            name="mines"
            min="1"
            max={gameConfig.width * gameConfig.height - 1}
            defaultValue={gameConfig.mines}
          />
        </div>
        <button type="submit">New Game</button>
      </form>

      {gameStatus !== 'playing' && (
        <div className="game-status">
          {gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
        </div>
      )}

      <div className="game-board">
        {gameBoard.map((row, y) => (
          <div key={y} className="board-row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell.isRevealed ? 'revealed' : ''} ${
                  cell.isFlagged ? 'flagged' : ''
                } ${cell.isRevealed && cell.isMine ? 'mine' : ''}`}
                onClick={() => handleCellClick(x, y)}
                onContextMenu={(e) => handleCellRightClick(e, x, y)}
              >
                {cell.isRevealed && !cell.isMine && cell.neighborMines > 0
                  ? cell.neighborMines
                  : ''}
                {cell.isRevealed && cell.isMine ? '💣' : ''}
                {!cell.isRevealed && cell.isFlagged ? '🚩' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
