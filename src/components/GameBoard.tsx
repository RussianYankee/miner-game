import { useEffect } from "react";

export type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

interface GameBoardProps {
    gameBoard: CellState[][],
    handleCellClick: (x: number, y: number) => void,
    handleCellRightClick: (e: React.MouseEvent, x: number, y: number) => void
}

const GameBoard = (boardProps: GameBoardProps) => {

  const cellIsEmpty = (c: CellState) => c.isRevealed && !c.isMine && c.neighborMines === 0;
  const cellIsMined = (c: CellState) => c.isRevealed && c.isMine;
  const cellIsFlagged = (c: CellState) => c.isFlagged === true;
  const cellIsRevealed = (c: CellState) => c.isRevealed === true;
  const cellHasNeighborMines = (c: CellState) => c.neighborMines > 0;
  const cellIsNotRevealedAndFlagged = (c: CellState) => !cellIsRevealed(c) && cellIsFlagged(c);
  const cellIsRevealedAndNotMined = (c: CellState) => cellIsRevealed(c) && !c.isMine && cellHasNeighborMines(c);

  return (
    <div className="game-board">
        {boardProps.gameBoard.map((row, y) => (
          <div key={y} className="board-row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell.isRevealed ? 'revealed' : ''} ${
                  cell.isFlagged ? 'flagged' : ''
                } ${cellIsMined(cell) ? 'mine' : ''} ${cellIsEmpty(cell) ? 'empty' : ''}`}
                onClick={() => boardProps.handleCellClick(x, y)}
                onContextMenu={(e) => boardProps.handleCellRightClick(e, x, y)}
                style={cellIsRevealedAndNotMined(cell) ? {color: `var(--mine-${cell.neighborMines}-color)`} : {}}
              >
                {cellIsRevealedAndNotMined(cell)
                  ? cell.neighborMines
                  : ''}
                {cellIsMined(cell) ? '💣' : ''}
                {cellIsNotRevealedAndFlagged(cell) ? '🚩' : ''}
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default GameBoard