
export interface GameConfig {
    width: number;
    height: number;
    mines: number;
}

interface FormProps {
    gameConfig: GameConfig;
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const GameControls = (formProps: FormProps) => {
  return (
    <form onSubmit={formProps.handleFormSubmit} className="config__form">
        <div className="config__item">
          <label className="config__item-label">Width: </label>
          <input className="config__item-input"
            type="number"
            name="width"
            min="5"
            max="30"
            defaultValue={formProps.gameConfig.width}
          />
        </div>
        <div className="config__item">
          <label className="config__item-label">Height: </label>
          <input className="config__item-input"
            type="number"
            name="height"
            min="5"
            max="30"
            defaultValue={formProps.gameConfig.height}
          />
        </div>
        <div className="config__item">
          <label className="config__item-label">Mines: </label>
          <input className="config__item-input"
            type="number"
            name="mines"
            min="1"
            max={formProps.gameConfig.width * formProps.gameConfig.height - 1}
            defaultValue={formProps.gameConfig.mines}
          />
        </div>
        <button className="config__form-button" type="submit">New Game</button>
      </form>
  )
}

export default GameControls