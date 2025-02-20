import { useState, useEffect } from 'react'
import './css/app.css'
import GameControls, { GameConfig } from './components/GameControls';
import GameBoard from './components/GameBoard';
import { useGameSetup } from './hooks/useGameSetup';
import DraggableFlag from './components/DraggableFlag';

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig>({
    width: 10,
    height: 10,
    mines: 10
  });

  const { 
    gameStatus,
    gameBoard,
    minesLeft,
    initializeBoard,
    handleCellClick,
    handleCellRightClick
  } = useGameSetup(gameConfig);

  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="minesweeper">
      <h1>Minesweeper</h1>

      <GameControls gameConfig={gameConfig} handleFormSubmit={handleConfigSubmit} />

      {gameStatus !== 'playing' && (
        <div className="game-status">
          {gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
        </div>
      )}

      <div className="game-info">
        <div className="mines-left">Mines Left: {minesLeft}</div>
        {isMobile && (
          <div className="mobile-controls">
            <div className="mobile-instructions">Drag flag to mark mines:</div>
            <DraggableFlag />
          </div>
        )}
      </div>

      <GameBoard
        gameBoard={gameBoard}
        handleCellClick={handleCellClick}
        handleCellRightClick={handleCellRightClick}
      />
    </div>
  )
}

export default App
