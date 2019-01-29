import React, { Component } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import Footer from "./Footer";
import { withState, compose } from "recompose";
import { defaultBoard } from "../lib/constants";

const enhance = compose(
  withState("currentPlayer", "setCurrentPlayer", "X"),
  withState("board", "setBoard", defaultBoard)
);

// TODO: Get rid of prop drilling
const App = ({ currentPlayer, setCurrentPlayer, board, setBoard }) => (
  <div className="App">
    <Header currentPlayer={currentPlayer} />
    <GameBoard
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
    />
    <Footer />
  </div>
);

export default enhance(App);
