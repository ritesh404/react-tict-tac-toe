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
import { playerToString } from "../lib/helpers";

const { Maybe, caseOf } = K;
const { Just } = Maybe;

// Alias: Board = Array Int

// (Int, Player, Board -> Board, Board) -> Board
export const updatePosition = R.curry((index, value, updateFn, board) => {
  const newBoard = [...board];
  newBoard[index] = Just(value);
  updateFn(newBoard);
  return newBoard;
});

// Player -> Player
export const togglePlayer = currentPlayer =>
  currentPlayer.cata({
    X: _ => Player.O,
    O: _ => Player.X
  });

// Board -> Array (Array Int) -> Array (Array Players | NoPlayer)
export const cellValues = R.curry((board, cells) =>
  R.map(
    R.map(cell =>
      caseOf(
        {
          Just: player => player.toString(),
          Nothing: _ => NoPlayer.toString()
        },
        board[cell]
      )
    ),
    cells
  )
);

// Player -> Array (Array Players | NoPlayer) -> Booloean
export const result = currentPlayer =>
  R.compose(
    R.any(v => v === true),
    R.map(
      R.all(player => {
        return currentPlayer.toString() === player;
      })
    )
  );

// Board -> Player -> Boolean -> GameState
export const getGameState = R.curry((board, currentPlayer, result) => {
  if (result === false && Maybe.catMaybes(board).length === 9) {
    return GameState.Draw;
  } else if (result === true) {
    return GameState.Win(currentPlayer);
  }
  return GameState.Playable;
});

// Board -> Array (Array Int) -> GameState
export const nextGameState = R.curry((board, cells, currentPlayer) =>
  R.compose(
    getGameState(board, currentPlayer),
    result(currentPlayer),
    cellValues
  )(board, cells)
);

// TODO: Add Styling
const BoardCell = ({ value, onClick = K.id }) => (
  <div onClick={onClick} className="board-cell">
    {Player.is(value) ? playerToString(value) : ""}
  </div>
);

const GameBoard = ({
  board = defaultBoard,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  gameState,
  setGameState
}) => (
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
                  nextGameState(newBoard, winningCells)
                )(currentPlayer);

                K.compose(
                  setCurrentPlayer,
                  togglePlayer
                )(currentPlayer);
              }}
            />
          )
        },
        cell
      )
    )}
  </div>
);

export default GameBoard;
