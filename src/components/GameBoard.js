import React from "react";
import K from "fp-kudojs";
import { defaultBoard } from "../lib/constants";

const { Maybe, caseOf } = K;
const { Nothing, Just } = Maybe;
const BoardCell = ({ value = "" }) => <div className="board-cell">{value}</div>;

const GameBoard = ({ board = defaultBoard }) => (
  <div className="game-section">
    <div className="game-board">
      {K.fmap(
        caseOf({
          Just: value => <BoardCell value={value} />,
          Nothing: _ => <BoardCell value={"x"} />
        }),
        board
      )}
    </div>
  </div>
);

export default GameBoard;
