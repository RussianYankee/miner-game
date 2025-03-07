import { useState, useEffect } from "react";
import { GameConfig } from "../components/GameControls";
import { CellState } from "../components/GameBoard";

export const useGameSetup = (gameConfig: GameConfig) => {
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [gameBoard, setGameBoard] = useState<CellState[][]>([]);
    const [minesLeft, setMinesLeft] = useState(gameConfig.mines);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
    
        setMinesLeft(gameConfig.mines);
        setGameBoard(board);
        setGameStatus('playing');
      };

      const handleCellClick = (x: number, y: number) => {
        if (gameStatus !== 'playing') return;
        if (gameBoard[y][x].isFlagged && isMobile) {
          handleCellRightClick(new MouseEvent('contextmenu'), x, y);
          return;
        } else if (gameBoard[y][x].isFlagged) return;
    
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
        if (gameStatus !== 'playing' || gameBoard[y][x].isRevealed || minesLeft <= 0) return;
    
        const newBoard = [...gameBoard.map(row => [...row])];
        newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
        newBoard[y][x].isFlagged ? setMinesLeft(minesLeft - 1) : setMinesLeft(minesLeft + 1);
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

        return {
            gameStatus,
            gameBoard,
            minesLeft,
            isMobile,
            initializeBoard,
            handleCellClick,
            handleCellRightClick
        };
}