import { useEffect, useState } from "react";

export interface GameConfig {
    width: number;
    height: number;
    mines: number;
}

interface FormProps {
    gameConfig: GameConfig;
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const GameControls = ({gameConfig, handleFormSubmit}: FormProps) => {
  const [maxMines, setMaxMines] = useState(gameConfig.width * gameConfig.height - 1);
  const [localState, setLocalState] = useState({
    width: gameConfig.width,
    height: gameConfig.height
  });
  // Update maxMines when gameConfig changes
  useEffect(() => {
    setMaxMines(localState.width * localState.height - 1);
  }, [localState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className="config__form glass-effect">
        <div className="config__item">
          <label className="config__item-label">Width: </label>
          <input className="config__item-input"
            type="number"
            name="width"
            min="5"
            max="30"
            defaultValue={gameConfig.width}
            onChange={handleInput}
          />
        </div>
        <div className="config__item">
          <label className="config__item-label">Height: </label>
          <input className="config__item-input"
            type="number"
            name="height"
            min="5"
            max="30"
            defaultValue={gameConfig.height}
            onChange={handleInput}
          />
        </div>
        <div className="config__item">
          <label className="config__item-label">Mines: </label>
          <input className="config__item-input"
            type="number"
            name="mines"
            min="1"
            max={maxMines}
            defaultValue={gameConfig.mines}
          />
        </div>
        <button className="config__form-button" type="submit">Apply</button>
      </form>
  )
}

export default GameControls