import React from "react";
import K from "fp-kudojs";
import {
  defaultBoard,
  Player,
  NoPlayer,
  winningCells,
  GameState
} from "../lib/constants";
import * as R from "ramda";

const { Maybe, caseOf } = K;
const { Nothing, Just } = Maybe;

// (Int, Player, Board => Board, Board) => Board
const updatePosition = (index, value, updateFn, board) => {
  const newBoard = [...board];
  newBoard[index] = Just(value);
  updateFn(newBoard);
  return newBoard;
};

// Player => Player
const togglePlayer = currentPlayer =>
  currentPlayer.cata({
    X: _ => Player.O,
    O: _ => Player.X
  });

// TODO: Add Styling
const BoardCell = ({ value, onClick = K.id }) => (
  <div onClick={onClick} className="board-cell">
    {Player.is(value)
      ? value.cata({
          X: _ => "X",
          O: _ => "O"
        })
      : ""}
  </div>
);

// Board => GameState
const nextGameState = R.curry((board, currentPlayer) => {
  const cellValues = R.map(
    R.map(cell =>
      caseOf(
        {
          Just: player => player.toString(),
          Nothing: _ => NoPlayer.toString()
        },
        board[cell]
      )
    ),
    winningCells
  );

  const result = R.compose(
    R.any(v => v === true),
    R.map(
      R.all(player => {
        return currentPlayer.toString() === player;
      })
    )
  )(cellValues);

  if (result === false && Maybe.catMaybes(board).length === 9) {
    return GameState.Draw;
  } else if (result === true) {
    return GameState.Win(currentPlayer);
  }
  return GameState.Playable;
});

const GameBoard = ({
  board = defaultBoard,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  gameState,
  setGameState
}) => (
  <div className="game-section">
    <div className="game-board">
      {board.map((cell, index) =>
        caseOf(
          {
            Just: value => <BoardCell key={`cell-${index}`} value={value} />,
            Nothing: _ => (
              <BoardCell
                key={`cell-${index}`}
                onClick={_ => {
                  const newBoard = updatePosition(
                    index,
                    currentPlayer,
                    setBoard,
                    board
                  );

                  K.compose(
                    setGameState,
                    nextGameState(newBoard)
                  )(currentPlayer);

                  K.compose(
                    setCurrentPlayer,
                    togglePlayer
                  )(currentPlayer);
                }}
                value={"x"}
              />
            )
          },
          cell
        )
      )}
    </div>
  </div>
);

export default GameBoard;
