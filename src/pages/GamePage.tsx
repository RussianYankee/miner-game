import React, { useEffect } from 'react';
import { useGameSetup } from '../hooks/useGameSetup';
import { GameConfig } from '../components/GameControls';
import GameBoard from '../components/GameBoard';
import DraggableFlag from '../components/DraggableFlag';

interface GamePageProps {
  gameConfig: GameConfig;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}
const GamePage = ({gameConfig, setGameConfig}:GamePageProps) => {
    
      const { 
        gameStatus,
        gameBoard,
        minesLeft,
        isMobile,
        initializeBoard,
        handleCellClick,
        handleCellRightClick
      } = useGameSetup(gameConfig);
    
      // Initialize the board when the gameConfig changes
       useEffect(() => {
         initializeBoard();
       }, [gameConfig]);

      const startNewGame = () => {
        setGameConfig({...gameConfig});
      }

  return (
    <>
        {gameStatus !== 'playing' && (
        <div className="game-status">
            {gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
        </div>
        )}

        <div className="game-controls">
          <button className='config__form-button new-game-btn' onClick={startNewGame}>New Game</button>
        </div>

        <div className="game-info glass-effect">
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
    </>
  )
}

export default GamePage