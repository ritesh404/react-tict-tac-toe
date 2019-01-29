import React from "react";
import K from "fp-kudojs";
import { defaultBoard } from "../lib/constants";

const { Maybe, caseOf } = K;
const { Nothing, Just } = Maybe;

const BoardCell = ({ value = "", onClick = K.id }) => (
  <div onClick={onClick} className="board-cell">
    {value}
  </div>
);

const updatePosition = (index, value, updateFn, board) => {
  const newBoard = [...board];
  newBoard[index] = Just(value);
  updateFn(newBoard);
};

const togglePlayer = currentPlayer => (currentPlayer === "X" ? "O" : "X");

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
            Just: value => <BoardCell value={value} />,
            Nothing: _ => (
              <BoardCell
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
