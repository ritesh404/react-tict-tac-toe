import React from "react";
import K from "fp-kudojs";
import { defaultBoard, Player } from "../lib/constants";

const { Maybe, caseOf } = K;
const { Nothing, Just } = Maybe;

// (Int, Player, Board => Board, Board) => Board
const updatePosition = (index, value, updateFn, board) => {
  const newBoard = [...board];
  newBoard[index] = Just(value);
  updateFn(newBoard);
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

const GameBoard = ({
  board = defaultBoard,
  setBoard,
  currentPlayer,
  setCurrentPlayer
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
                  updatePosition(index, currentPlayer, setBoard, board);
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
