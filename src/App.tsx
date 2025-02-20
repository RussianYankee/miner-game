import { useState, useEffect } from 'react'
import './css/app.css'
import GameControls, { GameConfig } from './components/GameControls';
import GameBoard from './components/GameBoard';
import { useGameSetup } from './hooks/useGameSetup';
import DraggableFlag from './components/DraggableFlag';

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    width: 8,
    height: 8,
    mines: 10
  });

  const { 
    gameStatus,
    gameBoard,
    minesLeft,
    isMobile,
    initializeBoard,
    handleCellClick,
    handleCellRightClick
  } = useGameSetup(gameConfig);

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
  };

  // Initialize the board when the gameConfig changes
   useEffect(() => {
     initializeBoard();
   }, [gameConfig]);

  return (
    <div className="minesweeper">
      <h1 className="title">Minesweeper</h1>

      <GameControls gameConfig={gameConfig} handleFormSubmit={handleConfigSubmit} />

      {gameStatus !== 'playing' && (
        <div className="game-status glass-effect">
          {gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
        </div>
      )}

      <div className="game-info">
        <div className="mines-left">Mines Left: {minesLeft}</div>
        {isMobile && (
          <div className="mobile-controls">
            <div className="mobile-instructions">Drag flag to mark mines:</div>
            <DraggableFlag isDraggable={minesLeft > 0} />
          </div>
        )}
      </div>

      <GameBoard
        gameBoard={gameBoard}
        handleCellClick={handleCellClick}
        handleCellRightClick={handleCellRightClick}
        isMobile={isMobile}
      />
    </div>
  )
}

export default App
